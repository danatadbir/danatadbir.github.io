import {Vector3} from "three";

export interface IControl {
  enable: boolean;
  damping: boolean;
  pan: boolean;
  zoom: boolean;
  rotate: boolean;
  target: IPosition;
  maxPolarAngle: number;
  minPolarAngle: number;
  minDistance: number;
  maxDistance: number;
}

export interface IPosition {
  x: number;
  y: number;
  z: number;
}

//orbitControl
export interface IOrbitControlOption {
  damping: boolean;
  enable: boolean;
  pan: boolean;
  rotate: boolean;
  target: Vector3;
}

export interface IOrbitControlLimit {
  maxPolarAngle: number;
  minPolarAngle: number;
}

interface IOrbitControls {
  enabled?: boolean;
  enableRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableDamping?: boolean;
  dampingFactor?: number;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableKeys?: boolean;
}
