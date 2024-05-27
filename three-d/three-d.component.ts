import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Color,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Action } from '../../../../hmi/utils/Interfaces/store.interface';
import { Store } from '@ngrx/store';
import { State3D } from '../../../../3D/data-access/Three-D.state';
import * as THREE from 'three';
import { IModelConfig } from '../../../../3D/utils/models/Model.interface';
import { catchError, tap } from 'rxjs/operators';
import { Model } from '../../../../3D/utils/Class/Model.class';
import { Camera } from '../../../../3D/utils/Class/Camera.class';
import { Light } from '../../../../3D/utils/Class/Light.class';
import { DashboardState } from '../../../../Dashboard/data-access/dashboard.state';
import { getDashboardItem } from '../../../../Dashboard/data-access/dashboard.selector';
import { ISceneConfig } from '../../../../3D/utils/models/Scene.interface';
import { ILabel } from 'src/app/3D/utils/models/Label.interface';
import { IPoint } from 'src/app/3D/utils/models/ILabel.interface';
import { TransmitService } from '@shared/services/transmit.service';
import { SharedFeaturesBaseComponent } from '../base-component/base-component.component';
import { IDashboardItem } from 'src/app/Dashboard/utils/Interfaces/Grid.interface';
import { ThreeDSaveModelData } from 'src/app/3D/utils/models';
import { DialogNotifyService } from '@shared/services/dialog-notify.service';
import { UploaderService } from '@shared/services/uploader.service';

@Component({
  selector: 'app-three-d',
  templateUrl: './three-d.component.html',
  styleUrls: ['./three-d.component.scss'],
})
export class ThreeDComponent
  extends SharedFeaturesBaseComponent<State3D>
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  private Model!: Model;
  private Light: Light;
  private Camera: Camera;

  scene = new Scene();
  renderer: WebGLRenderer;
  size = { height: 0, width: 0 };

  details: ILabel[] = [];
  private points: IPoint[] = [];
  raycasterCamera: Raycaster;

  action = Action;

  public Action = Action;
  public loading = true;

  constructor(
    private uploaderService: UploaderService,
    private store: Store<DashboardState>,
    private transmit: TransmitService,
    private notify: DialogNotifyService
  ) {
    super();
    this.Model = new Model(this.transmit);
    this.Light = new Light(this.scene);
    this.Camera = new Camera();
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnInit(): void {
    this.setCanvasSize();
  }

  async init(config: IDashboardItem<ThreeDSaveModelData>) {
    if (config?.content?.config?.labels) {
      await this.applyLabelsConfig(config?.content?.config?.labels);
    }
    this.points = [];
    for (const item of this.details) {
      // this.addLabel(item.point.x, item.point.y, item.point.z)
      const point: IPoint = {
        position: new Vector3(item.point.x, item.point.y, item.point.z),
        element: document.querySelector('.' + item.class) as any,
      };
      this.points.push(point);
    }

    const mainConfig: State3D = config.content?.config || config['config'];
    if (mainConfig && mainConfig.background) {
      this.applyBackgroundConfig(mainConfig.background);
      this.applySceneConfig(mainConfig.scene);
    }
    // =>init camera
    this.Camera.addCameraToScene(this.scene, mainConfig.scene.camera);
    this.Camera.updateAspect(this.size.width, this.size.height);
    // =>init orbit control
    this.Camera.initOrbitControl(this.canvas, mainConfig.scene.control);
    // =>init light
    if (mainConfig.scene.light) {
      mainConfig.scene.lights = [mainConfig.scene.light];
    }
    this.Light.updateAllLights(mainConfig.scene.lights);

    this.setRenderer();
    this.onResize();
  }

  async ngAfterViewInit() {
    this.safeObservable(this.store.select(getDashboardItem(this.id)))
      .pipe(
        tap((config: any) => {
          if (!config) return;
          this.init(config);
        })
      )
      .subscribe();

    // this.setControlConfig();

    const backgroundDone = (
      range: { width: number; height: number; length: number },
      scale: { x: number; y: number; z: number },
      position: { x: number; y: number; z: number },
      rotation: { x: number; y: number; z: number },
      id: number
    ) => {
      if (this.config.background)
        this.applyBackgroundConfig(this.config.background);
      this.loading = false;
    };
    const componentDone = (
      range: { width: number; height: number; length: number },
      scale: { x: number; y: number; z: number },
      position: { x: number; y: number; z: number },
      rotation: { x: number; y: number; z: number },
      id: number,
      extraData?: IModelConfig
    ) => {
      this.applyComponentConfig(extraData!, id);
    };
    const error = (error: string) => {
      console.error('Error loading file:', error);
      this.notify.errorSnack('Error loading file:' + String(error));
    };

    this.raycasterCamera = new Raycaster();
    this.animate();

    if (this.config.background) {
      const background = this.config.background;
      const bgFile = await this.uploaderService.getUserFileById(
        background.file!
      );
      if (!bgFile) {
        this.notify.errorSnack('can not load background');
        return;
      }
      let format = '.fbx';
      if (background.file!.split('.').length > 1) {
        format = '.' + background.file!.split('.').pop();
      }
      this.Model.load3DFile(
        bgFile.fileUrl,
        format,
        background.file!,
        this.scene,
        backgroundDone,
        error
      );
    }
    // =>load components
    if (this.config.components) {
      for (const component of this.config.components) {
        const cmpFile = await this.uploaderService.getUserFileById(
          component.file!
        );
        if (!cmpFile) {
          this.notify.errorSnack('can not load component model');
          continue;
        }
        let format = '.fbx';
        if (component.file!.split('.').length > 1) {
          format = '.' + component.file!.split('.').pop();
        }
        this.Model.load3DFile<IModelConfig>(
          cmpFile.fileUrl,
          format,
          component.file!,
          this.scene,
          componentDone,
          error,
          undefined,
          component
        );
      }
    }
  }

  animate() {
    this.Camera.orbitControl?.update();
    //points
    this.points = [];
    if (!this.details) this.details = [];
    this.details.forEach(detail => {
      const coordinate = detail.point;
      const element = document.querySelector<HTMLElement>('.' + detail.class);
      if (!element) return;
      const point: IPoint = {
        element,
        position: new Vector3(coordinate.x, coordinate.y, coordinate.z),
      };
      this.points.push(point);
    });
    try {
      this.points.forEach((point: IPoint, index: number) => {
        const screenPosition: any = point.position.clone();
        screenPosition.project(this.Camera.camera);

        this.raycasterCamera.setFromCamera(screenPosition, this.Camera.camera);
        const intersects = this.raycasterCamera.intersectObjects(
          this.scene.children,
          true
        );
        if (intersects.length === 0) {
          point.element.classList.add('visible');
        } else {
          const intersectDistance = intersects[0].distance;
          const pointDistance = point.position.distanceTo(
            this.Camera.camera.position
          );
          if (intersectDistance < pointDistance) {
            point.element.classList.remove('visible');
          } else {
            point.element.classList.add('visible');
          }
        }
        const translateX = (screenPosition.x * this.size.width) / 2;
        const translateY = (-screenPosition.y * this.size.height) / 2;
        point.element.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    } catch {}
    if (this.renderer) {
      this.renderer.render(this.scene, this.Camera.camera);
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }

  private applySceneConfig(config: ISceneConfig) {
    if (config.backgroundColor) {
      this.scene.background = new THREE.Color(config.backgroundColor);
    } else {
      this.scene.background = new Color().setHSL(0.6, 0, 1);
    }
  }

  private applyBackgroundConfig(config: IModelConfig) {
    const background = this.scene.getObjectById(config.id);
    if (background) {
      background.position.set(
        config.position.x,
        config.position.y,
        config.position.z
      );
      background.rotation.set(
        config.rotation.x,
        config.rotation.y,
        config.rotation.z
      );
      background.scale.set(config.scale.x, config.scale.y, config.scale.z);
    }
  }

  private applyComponentConfig(config: IModelConfig, id: number) {
    const component = this.scene.getObjectById(id);
    if (component) {
      component.position.set(
        config.position.x,
        config.position.y,
        config.position.z
      );
      component.rotation.set(
        config.rotation.x,
        config.rotation.y,
        config.rotation.z
      );
      component.scale.set(config.scale.x, config.scale.y, config.scale.z);
    }
  }

  private setCanvasSize() {
    this.size = {
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight,
    };
  }

  onResize() {
    this.size.width = this.canvas.clientWidth;
    this.size.height = this.canvas.clientHeight;
    if (this.Camera.camera) {
      this.Camera.updateAspect(this.size.width, this.size.height);
    }
    if (this.renderer) {
      this.renderer.setSize(this.size.width, this.size.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  private setRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private async applyLabelsConfig(config: ILabel[]) {
    if (!config) config = [];
    this.details = JSON.parse(JSON.stringify(config));
    // =>normalize
    for (const lbl of this.details) {
      if (lbl.view?.icon) {
        lbl.view._imageIcon = undefined;
        const iconFile = await this.uploaderService.getUserFileById(
          lbl.view?.icon
        );
        if (iconFile) {
          lbl.view._imageIcon = iconFile.fileUrl;
        }
      }
    }
  }
}
