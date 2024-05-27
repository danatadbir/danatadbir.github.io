import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import * as THREE from 'three';
import { Object3D, Vector3 } from 'three';
import { TransmitService } from '@shared/services/transmit.service';

export class Model {
  protected transmit: TransmitService;
  constructor(transmit?: TransmitService) {
    if (transmit) {
      this.transmit = transmit;
    }
  }

  public load3DFile<T = any>(
    fileUrl: string,
    format: string,
    file: any,
    scene: THREE.Scene,
    onLoad: (
      range: { width: number; height: number; length: number },
      scale: { x: number; y: number; z: number },
      position: { x: number; y: number; z: number },
      rotation: { x: number; y: number; z: number },
      id: number,
      extraData?: T
    ) => void,
    onError: (error: any, extraData?: T) => void,
    onAddObject?: (object: THREE.Group, extraData?: T) => void,
    extraData?: T
  ) {
    this.transmit?.emit('page-loading', true);
    if (format === '.gltf') {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        fileUrl,
        (gltf: any) => {
          scene.add(gltf);
          if (onAddObject) {
            onAddObject(gltf, extraData);
          }
          const box = new THREE.Box3().setFromObject(gltf);
          const size = new THREE.Vector3();
          box.getSize(size);
          this.fixScale(gltf, size.x, size.y, size.z);
          const range = { width: size.x, height: size.y, length: size.z };
          const position = {
            x: gltf.position.x,
            y: gltf.position.y,
            z: gltf.position.z,
          };
          const scale = { x: gltf.scale.x, y: gltf.scale.y, z: gltf.scale.z };
          const rotation = {
            x: gltf.rotation.x,
            y: gltf.rotation.y,
            z: gltf.rotation.z,
          };
          onLoad(range, scale, position, rotation, gltf.id, extraData);
          this.transmit?.emit('page-loading', false);
        },
        undefined,
        error => {
          this.transmit?.emit('page-loading', false);
          onError(error, extraData);
        }
      );
    } else if (format === '.fbx') {
      const fbxLoader = new FBXLoader();
      fbxLoader.load(
        fileUrl,
        fbx => {
          scene.add(fbx);
          if (onAddObject) {
            onAddObject(fbx, extraData);
          }
          const box = new THREE.Box3().setFromObject(fbx);
          const size = new THREE.Vector3();
          box.getSize(size);
          this.fixScale(fbx, size.x, size.y, size.z);
          const range = { width: size.x, height: size.y, length: size.z };
          const position = {
            x: fbx.position.x,
            y: fbx.position.y,
            z: fbx.position.z,
          };
          const scale = { x: fbx.scale.x, y: fbx.scale.y, z: fbx.scale.z };
          const rotation = {
            x: fbx.rotation.x,
            y: fbx.rotation.y,
            z: fbx.rotation.z,
          };
          onLoad(range, scale, position, rotation, fbx.id, extraData);
          this.transmit?.emit('page-loading', false);
        },
        undefined,
        error => {
          this.transmit?.emit('page-loading', false);
          onError(error, extraData);
        }
      );
    } else {
      console.error(`Unsupported file format: ${format}`);
      this.transmit?.emit('page-loading', false);
    }
  }

  private fixScale(
    object: Object3D,
    width: number,
    height: number,
    length: number
  ) {
    const max = Math.max(width, height, length);
    if (max > 1000) {
      const offset = max / 1000;
      object.scale.divide(new Vector3(offset, offset, offset));
    }
  }

  setModelConfig(model: Object3D, file: any) {
    return {
      id: model.id,
      file: file,
      position: {
        x: model.position.x,
        y: model.position.y,
        z: model.position.z,
      },
      rotation: {
        x: model.rotation.x,
        y: model.rotation.y,
        z: model.rotation.z,
      },
      scale: {
        x: model.scale.x,
        y: model.scale.y,
        z: model.scale.z,
      },
    };
  }
}
