import * as THREE from 'three';
import { ILightSettings } from '../models/Light.interface';

export class Light {
  private _lights: THREE.Light[] = [];
  private _lightSettings: ILightSettings[] = [];
  private _lightHelpers: any[] = [];
  private _scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this._scene = scene;
  }

  get scene() {
    return this._scene;
  }

  public addOrUpdateLight(
    lightSettings: ILightSettings,
    addHelpers = false
  ): void {
    // =>find light by id
    this.removeLight(lightSettings.id);
    if (!lightSettings.id) {
      lightSettings.id = 'light_' + new Date().getTime();
    }
    const newLight = this.updateConfigs(lightSettings, addHelpers);
    if (newLight) {
      this._scene.add(newLight);
    }
  }

  public removeLight(id: string, deleteArrayIndex = false) {
    // =>find light by id
    const index = this._lightSettings?.findIndex(i => i.id === id) ?? -1;
    if (index < 0) return;
    if (this._lights[index]) {
      this._lights[index].dispose();
      this._scene.remove(this._lights[index]);
    }
    //@ts-ignore
    // this._lightSettings[index] = {
    //   type
    // };
    if (this._lightHelpers[index]) {
      this._lightHelpers[index].dispose();
      this._scene.remove(this._lightHelpers[index]);
    }
    if (deleteArrayIndex) {
      this._lights.splice(index, 1);
      this._lightSettings.splice(index, 1);
      this._lightHelpers.splice(index, 1);
    }
  }

  public updateAllLights(lightSettings: ILightSettings[], addHelpers = false) {
    // =>remove from scene, if exist
    if (this._lights) {
      for (let i = 0; i < this._lights.length; i++) {
        this.removeLight(this._lightSettings[i].id);
      }
      this._lights = [];
    }
    for (const set of lightSettings) {
      const light = this.updateConfigs(set, addHelpers);
      if (light) {
        this.scene.add(light);
      }
    }
  }

  get lightsSettings() {
    return this._lightSettings;
  }

  private updateConfigs(lightSettings: ILightSettings, addHelpers = false) {
    let helper;
    const helperColor = new THREE.Color('rgb(255, 0, 0)');
    // =>find light by id
    const index =
      this._lightSettings?.findIndex(i => i.id === lightSettings.id) ?? -1;
    let light: THREE.Light;
    const color = new THREE.Color(lightSettings.color);

    switch (lightSettings.type) {
      case 'AmbientLight':
        light = new THREE.AmbientLight(color, lightSettings.intensity);
        break;
      case 'DirectionalLight':
        light = new THREE.DirectionalLight(color, lightSettings.intensity);
        if (lightSettings.position) {
          light.position.set(
            lightSettings.position.x,
            lightSettings.position.y,
            lightSettings.position.z
          );
        }

        if (lightSettings.target) {
          const target = new THREE.Object3D();
          target.position.set(
            lightSettings.target.x,
            lightSettings.target.y,
            lightSettings.target.z
          );
          this.scene.add(target);
          (light as THREE.DirectionalLight).target = target;
        }
        light.castShadow = !!lightSettings.castShadow;
        if (addHelpers) {
          helper = new THREE.DirectionalLightHelper(
            light as THREE.DirectionalLight,
            50,
            helperColor
          );
          this.scene.add(helper);
        }
        break;
      case 'PointLight':
        light = new THREE.PointLight(color, lightSettings.intensity);
        if (lightSettings.position) {
          light.position.set(
            lightSettings.position.x,
            lightSettings.position.y,
            lightSettings.position.z
          );
        }
        if (addHelpers) {
          helper = new THREE.PointLightHelper(
            light as THREE.PointLight,
            50,
            helperColor
          );
          this.scene.add(helper);
        }
        light.castShadow = !!lightSettings.castShadow;
        break;
      case 'SpotLight':
        light = new THREE.SpotLight(color, lightSettings.intensity);
        if (lightSettings.position) {
          light.position.set(
            lightSettings.position.x,
            lightSettings.position.y,
            lightSettings.position.z
          );
        }
        if (lightSettings.target) {
          const target = new THREE.Object3D();
          target.position.set(
            lightSettings.target.x,
            lightSettings.target.y,
            lightSettings.target.z
          );
          this.scene.add(target);
          (light as THREE.SpotLight).target = target;
        }
        if (addHelpers) {
          helper = new THREE.SpotLightHelper(
            light as THREE.SpotLight,
            helperColor
          );
          this.scene.add(helper);
        }
        light.castShadow = !!lightSettings.castShadow;
        break;
      default:
        console.warn(`Unsupported light type: ${lightSettings.type}`);
        return;
    }

    if (index > -1) {
      this._lights[index] = light;
      this._lightSettings[index] = lightSettings;
      this._lightHelpers[index] = helper;
    } else {
      this._lights.push(light);
      this._lightSettings.push(lightSettings);
      this._lightHelpers.push(helper);
    }
    return light;
  }
}
