import { ILabel } from './Label.interface';
import { IModelConfig } from './Model.interface';
import { ISceneConfig } from './Scene.interface';

export interface ThreeDSaveModel {
  id?: string;
  modifiedAt?: string;
  type: 'D3';
  name: string;
  workspaceId: string;
  data: ThreeDSaveModelData;
}

export interface ThreeDSaveModelData {
  scene: ISceneConfig;
  background?: IModelConfig;
  components: IModelConfig[];
  labels: ILabel[];
  activeModelId: number;
}
