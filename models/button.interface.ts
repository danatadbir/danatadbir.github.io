import {
  IContentSetting,
  IViewSetting,
} from '../models';
import { IOutputs, ITopic } from '../models';

export interface IButtonConfig {
  name: string;
  content: IButtonContent | null;
  view: IButtonView;
}

export const buttonView: IButtonView = {
  Animation: {
    color: '#00ff00',
  },
  Labels: {
    title: 'Title',
  },
  Button: {
    color: '#FF0000',
  },
};

export const ButtonConfig: IButtonConfig = {
  name: 'Card',
  content: null,
  view: buttonView,
};

export interface IButtonContent {
  topic: ITopic;
  outputs: IOutputs;
}

export interface IButtonView {
  Labels: { title: string };
  Animation: { color: string };
  Button: { color: string };
}

export const ButtonContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
];
export const ButtonViewSettings: IViewSetting[] = [
  {
    name: 'Labels',
    isArray: false,
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'Animation',
    isArray: false,
    config: [{ key: 'color', type: 'color' }],
  },
  {
    name: 'Button',
    isArray: false,
    config: [{ key: 'color', type: 'color' }],
  },
];
