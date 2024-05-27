import { IContentSetting, IViewSetting } from './Components.interface';
import { IOutputs, ITopic } from './device.interface';

export interface ISliderConfig {
  name: string;
  content: ISliderContent | null;
  view: ISliderView;
}

// Range Slider Config
export interface ISliderContent {
  topic: ITopic | null;
  outputs: IOutputs | null;
  min: number;
  max: number;
  step: number;
}

export const sliderView: ISliderView = {
  Ticks: {
    show: true,
    bigLabelStep: 10,
    smallLabelStep: 5,
    showTicksBetweenLabels: true,
  },
  Button: {
    showButtons: true,
    btnBgColor: '#c5c5c5',
    btnColor: '#000',
  },
  Chart: {
    color: '#eeeeee',
    showTooltip: true,
    orientation: 'vertical',
  },
  Labels: {
    title: 'Slider',
  },
};
export const sliderContent: ISliderContent = {
  step: 5,
  max: 100,
  min: 0,
  outputs: null,
  topic: null,
};

export const SliderConfig: ISliderConfig = {
  name: 'Slider',
  content: sliderContent,
  view: sliderView,
};

export interface ISliderView {
  Labels: { title: string };
  Button: {
    showButtons: boolean;
    btnBgColor: string;
    btnColor: string;
  };
  Ticks: {
    show: boolean;
    bigLabelStep: number;
    smallLabelStep: number;
    showTicksBetweenLabels: boolean;
  };
  Chart: {
    color: string;
    showTooltip: boolean;
    orientation: 'vertical' | 'horizontal';
  };
}

export const SliderContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
  {
    key: 'min',
    type: 'number',
  },
  {
    key: 'max',
    type: 'number',
  },
  {
    key: 'step',
    type: 'number',
  },
];
export const SliderViewSettings: IViewSetting[] = [
  {
    name: 'Labels',
    isArray: false,
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'Button',
    isArray: false,
    config: [
      { key: 'showButtons', type: 'toggle' },
      { key: 'btnBgColor', type: 'color' },
      { key: 'btnColor', type: 'color' },
    ],
  },
  {
    name: 'Ticks',
    isArray: false,
    config: [
      { key: 'showTicks', type: 'toggle' },
      { key: 'showTicksBetweenLabels', type: 'toggle' },
      { key: 'bigLabelStep', type: 'number' },
      { key: 'smallLabelStep', type: 'number' },
    ],
  },
  {
    name: 'Chart',
    isArray: false,
    config: [
      { key: 'color', type: 'color' },
      { key: 'showTooltip', type: 'toggle' },
      {
        key: 'orientation',
        type: 'select',
        options: ['vertical', 'horizontal'],
      },
    ],
  },
];
