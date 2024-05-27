import {Color} from "three";

export interface IAmbient {
  color: string;
  intensity: number;
}

export interface ILight {
  ambient: IAmbient;
  directional: {
    position: {
      x: number;
      y: number;
      z: number;
    },
    color: Color;
    intensity: number;
    target: {
      x: number;
      y: number;
      z: number;
    },
  }
}

export interface ILightSettings {
  id: string
  type: 'AmbientLight' | 'DirectionalLight' | 'PointLight' | 'SpotLight';
  color: string;
  intensity: number;
  position?: { x: number; y: number; z: number };
  target?: { x: number; y: number; z: number };
  castShadow?: boolean;
}
