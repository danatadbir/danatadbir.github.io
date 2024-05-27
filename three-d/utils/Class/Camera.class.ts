import { PerspectiveCamera, Vector3, Box3 } from 'three';
import { ICamera } from '../models/Camera.interface';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IControl } from '../models/Control.interface';
import { TransmitService } from '@shared/services/transmit.service';
// import { ThreeDConfigsService } from '../../data-access/servivce/three-d-configs.service';

export class Camera {
  private _camera: PerspectiveCamera;
  private _orbitControl: OrbitControls;
  //FIXME:
  //@ts-ignore
  private _configs: ThreeDConfigsService;
  //FIXME:
  //@ts-ignore
  constructor(configs?: ThreeDConfigsService) {
    if (configs) {
      this._configs = configs;
    }
  }
  get camera() {
    return this._camera;
  }

  get orbitControl() {
    return this._orbitControl;
  }

  public resetOrbitControl() {
    if (!this.orbitControl) return;
    if (this._configs) {
      this.updateOrbitControlConfigs(this._configs.sceneConfig.control);
    } else {
      this.orbitControl.enablePan = true;
      this.orbitControl.enableDamping = true;
      this.orbitControl.enableRotate = true;
      this.orbitControl.enableZoom = true;
      this.orbitControl.minPolarAngle = 0;
      this.orbitControl.maxPolarAngle = Math.PI / 2;
    }
  }

  public initOrbitControl(canvas: HTMLCanvasElement, config: IControl) {
    // console.log('orbit control:', config);
    this._orbitControl = new OrbitControls(this._camera, canvas);
    this.updateOrbitControlConfigs(config);
  }

  public updateOrbitControlConfigs(config: IControl) {
    this._orbitControl.enabled = config.enable;
    this._orbitControl.enableDamping = config.damping;
    this._orbitControl.enablePan = config.pan;
    this._orbitControl.enableRotate = config.rotate;
    this._orbitControl.enableZoom = config.zoom;
    this._orbitControl.maxPolarAngle = config.maxPolarAngle;
    this._orbitControl.minPolarAngle = config.minPolarAngle;
    this._orbitControl.maxDistance = config.maxDistance ?? Infinity;
    this._orbitControl.minDistance = config.minDistance ?? 0;
    this._orbitControl.target.set(
      config.target.x,
      config.target.y,
      config.target.z
    );
  }

  public updateAspect(width: number, height: number) {
    if (!this._camera) return;
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }
  public addCameraToScene(scene: THREE.Scene, cameraSettings?: ICamera) {
    const camera = new PerspectiveCamera();
    // camera.position.copy(new Vector3(position.x, position.y, position.z));
    // camera.lookAt(new Vector3(target.x, target.y, target.z));
    this._camera = camera;
    scene.add(camera);
    if (cameraSettings) {
      this.updateCameraConfigs(cameraSettings);
    }
    return camera;
  }

  public updateCameraConfigs(config: ICamera) {
    // console.log('camera:', config);
    this.camera.position.set(
      config.position.x,
      config.position.y,
      config.position.z
    );
    // this.camera.lookAt(
    //   new Vector3(config.position.x, config.position.y, config.position.z)
    // );
    this.camera.lookAt(
      new Vector3(config.target.x, config.target.y, config.target.z)
    );
    this.camera.far = config.far;
    this.camera.near = config.near;
    this.camera.fov = config.fov;
    this.camera.updateProjectionMatrix();
    if (config.aspect) {
      this.camera.aspect = config.aspect;
    }
  }
  /**
   * @deprecated
   */
  public fitCameraToObject(object: any, offset = 1.25, controls?: any) {
    const boundingBox = new Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);
    var objectWorldPosition = new Vector3();
    // objectWorldPosition.setFromMatrixPosition(object.matrixWorld);

    const center = boundingBox.getCenter(objectWorldPosition);

    const size = boundingBox.getSize(objectWorldPosition);

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this._camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    this._camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    this._camera.far = cameraToFarEdge * 3;
    this._camera.updateProjectionMatrix();

    // if ( controls ) {

    //   // set camera to rotate around center of loaded object
    //   controls.target = center;

    //   // prevent camera from zooming out far enough to create far plane cutoff
    //   controls.maxDistance = cameraToFarEdge * 2;

    //   controls.saveState();

    // } else {

    this._camera.lookAt(center);

    //  }
  }

  /**
   * @deprecated
   * @param group
   */
  public fitCameraToObjectGroup(group: THREE.Group) {
    const box = new Box3().setFromObject(group);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxSize = Math.max(size.x, size.y);
    const margin = 1.2;
    const fitHeightDistance =
      maxSize / (2 * Math.atan((Math.PI * this._camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / this._camera.aspect;
    const distance = margin * Math.max(fitHeightDistance, fitWidthDistance);

    const currentCameraPos = new Vector3().copy(this._camera.position);
    const direction = center
      .clone()
      .sub(this._camera.position)
      .normalize()
      .multiplyScalar(distance);

    const goalCameraPos = new Vector3().copy(center).sub(direction);
    const goalFocusVec = new Vector3().copy(center);
    this._camera.position.copy(goalCameraPos);
    this._camera.updateProjectionMatrix();
    this._camera.lookAt(goalFocusVec);
  }

  public setBackgroundCenter(backgroundObject: THREE.Group) {
    this.orbitControl.reset();

    const box = new Box3().setFromObject(backgroundObject);
    const size = box.getSize(new Vector3());
    const sizeLen = size.length();
    const center = box.getCenter(new Vector3());
    // const position = {
    //   x: (backgroundObject.position.x +=
    //     backgroundObject.position.x - center.x),
    //   y: (backgroundObject.position.y +=
    //     backgroundObject.position.y - center.y),
    //   z: (backgroundObject.position.z +=
    //     backgroundObject.position.z - center.z),
    // };

    // this.fileName = config.file;
    // console.log('get center', config, this.camera);
    // let bbox = new THREE.Box3().setFromObject(object);
    // let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));
    // let size = bbox.getSize(new THREE.Vector3()); // HEREyou get the size
    // this.configs.scene.add(helper);
    // console.log('object', object.position, object.scale, size);

    this.camera.near = sizeLen / 100;
    this.camera.far = sizeLen * 100;
    this.camera.focus = 0.5;
    this.camera.fov = 80;
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(center);
    const xRate = Number((sizeLen / size.x).toFixed(2));
    this.camera.position.x += sizeLen / xRate;
    this.camera.position.y += sizeLen / 5.0;
    const zRate = Number((sizeLen / size.z).toFixed(2));
    this.camera.position.z += sizeLen / zRate;

    // console.log('center:', this.camera.position, size, sizeLen, center);

    this.camera.lookAt(center);
    // console.log(background, this.Camera.camera);

    this.orbitControl.maxDistance = sizeLen * 10;
    this.orbitControl.update();

    this._configs.updateSceneConfigs({
      // control:{

      // },
      camera: {
        aspect: this.camera.aspect,
        far: this.camera.far,
        fov: this.camera.fov,
        near: this.camera.near,
        position: this.camera.position,
        target: center,
      },
    });
  }
}
