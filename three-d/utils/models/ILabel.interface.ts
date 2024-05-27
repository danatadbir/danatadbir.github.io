import {Vector3} from "three";

export interface IDetail {
  point: { x: number, y: number, z: number },
  class: string;
  title: string;
  type: 'redirect' | 'dialog' | 'label';
  description?: string | null;
  dialog?: {
    component: string;
    config: any;
  } | null;
  redirectId?: string | null;
}

export interface IPoint {
  position: Vector3,
  element: HTMLElement;
}
