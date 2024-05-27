import {ICamera} from "./Camera.interface";
import {IControl} from "./Control.interface";
import {IFog} from "./Fog.interface";
import {IAmbient, ILightSettings} from "./Light.interface";

export interface ISceneConfig {
  backgroundColor: string;
  fog: IFog;
  camera: ICamera;
  control: IControl;
  /**
   * @deprecated
   */
  light?: ILightSettings
  lights: ILightSettings[]
}
