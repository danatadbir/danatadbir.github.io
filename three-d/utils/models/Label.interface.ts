import { IOutput, ITopic } from '../../../models';
import { Action } from '../models';

export interface ILabel {
  id: string;
  point: { x: number; y: number; z: number };
  class: string;
  title: string;
  action: {
    type: Action;
    description?: string;
    component?: string;
    config?: any;
    application?: string;
    dashboard?: string;
    url?: string;
  };
  content: {
    label: string;
    dynamic: {
      topic: ITopic | null;
      output: IOutput | null;
    };
  };
  view: {
    icon: string | null;
    _imageIcon?: string;
  };
}
