export interface update3DComponentConfigs {
  id: number;
  from: 'configs' | 'main';
  position?: { x: number; y?: number; z?: number };
  rotate?:  { x: number; y?: number; z?: number };
  scale?:  { x: number; y?: number; z?: number };
}
