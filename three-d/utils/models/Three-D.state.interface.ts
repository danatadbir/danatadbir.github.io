import { ISceneConfig } from './Scene.interface';
import { IModelConfig } from './Model.interface';
import { ILabel } from './Label.interface';

// const defaultSceneConfig: ISceneConfig = {
//   backgroundColor: '#FFFFFF',
//   fog: {
//     enable: false,
//     color: '#eee',
//     near: 10,
//     far: 100
//   },
//   control: {
//     enable: true,
//     damping: true,
//     rotate: true,
//     pan: true,
//     zoom: true,
//     target: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     minPolarAngle: 0,
//     maxPolarAngle: Math.PI / 2
//   },
//   camera: {
//     fov: 45,
//     target: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     position: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     aspect: 0,
//     near: 0.1,
//     far: 1000
//   },
//   light: {
//     color: '#FFFFFF',
//     intensity: 0.5
//   }
// }

export interface State3D {
  scene: ISceneConfig;
  background: IModelConfig | null;
  components: IModelConfig[];
  labels: ILabel[];
  activeModel: number;
}

// export const ThreeDState: State3D = {
//   scene: defaultSceneConfig,
//   background: null,
//   components: [],
//   labels: [],
//   activeModel: -1
// };
