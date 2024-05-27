import { Vector3 } from 'three';
import { IPosition } from './Control.interface';

export interface ICamera {
  position: IPosition;
  target: IPosition;
  fov: number;
  aspect: number;
  near: number;
  far: number;
}
