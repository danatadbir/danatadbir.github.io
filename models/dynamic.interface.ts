import {
  IBullet,
  ICursor,
  IScrollbar,
  ITarget,
  IXRenderer,
} from './config.interface';
import { IChartSetting } from './config.interface';
import {
  IContentSetting,
  IViewSetting,
} from '../models';
import { IOutputs, ITopic } from '../models';

export interface IDynamicChart {
  name: string;
  content: IDynamicChartContent[];
  view: IDynamicChartView;
}

export interface IDynamicChartContent {
  topic: ITopic;
  outputs: IOutputs;
  Equivalent: string;
  color: string;
}

export interface IDynamicChartView {
  label: { title: string };
  bullet: IBullet;
  chart: IChartSetting;
  cursor: ICursor;
  scrollbarX: IScrollbarX;
  scrollbarY: IScrollbarY;
  target: ITarget;
  xRenderer: IXRenderer;
}

const DynamicChartView: IDynamicChartView = {
  label: {
    title: 'Dynamic Chart Title',
  },
  bullet: {
    size: 2,
  },
  target: {
    enabled: false,
    title: 'target',
    value: 20,
  },
  chart: {
    panX: false,
    panY: false,
    wheelX: 'none',
    wheelY: 'none',
    pinchZoomX: false,
  },
  cursor: {
    lineX: false,
    lineY: false,
  },
  scrollbarX: {
    enable: true,
    height: 30,
    type: 'normal',
    endGripSize: 0.5,
    startGripSize: 0.5,
    position: 'bottom',
  },
  scrollbarY: {
    enable: true,
    width: 30,
    endGripSize: 0.5,
    startGripSize: 0.5,
  },
  xRenderer: {
    rotation: -90,
    centerY: '50',
    centerX: '100',
    marginTop: 1,
    breakWords: true,
    textAlign: 'center',
    fontSize: 10,
    visible: false,
  },
};
const DynamicChartContent: IDynamicChartContent[] = [];
export const DynamicChartConfig: IDynamicChart = {
  name: 'DynamicChart',
  content: DynamicChartContent,
  view: DynamicChartView,
};
export const DynamicChartContentSettings: IContentSetting[] = [
  {
    key: 'color',
    type: 'color',
  },
  {
    key: 'Equivalent',
    type: 'text',
  },
  {
    key: 'isLinked',
    type: 'boolean',
  },
  {
    key: 'content',
    type: 'array',
  },
];
export const DynamicChartViewSettings: IViewSetting[] = [
  {
    name: 'label',
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'bullet',
    config: [{ key: 'size', type: 'number' }],
  },
  {
    name: 'chart',
    config: [
      { key: 'BackgroundColor', type: 'color' },
      {key: 'panX', type: 'toggle'},
      {key: 'panY', type: 'toggle'},
      {key: 'wheelX', type: 'select', options: ["zoomX", "zoomY", "zoomXY", "panX", "panY", "panXY", "none"]},
      {key: 'wheelY', type: 'select', options: ["zoomX", "zoomY", "zoomXY", "panX", "panY", "panXY", "none"]},
      {key: 'pinchZoomX', type: 'toggle'},
    ],
  },
  {
    name: 'cursor',
    config: [
      { key: 'lineX', type: 'toggle' },
      { key: 'lineY', type: 'toggle' },
    ],
  },
  {
    name: 'target',
    config: [
      { key: 'enabled', type: 'toggle' },
      { key: 'value', type: 'number' },
      { key: 'title', type: 'text' },
    ],
  },
  {
    name: 'scrollbarX',
    config: [
      {
        key: 'enable',
        type: 'toggle',
      },
      {
        key: 'height',
        type: 'number',
      },
      {
        key: 'startGripSize',
        type: 'number',
      },
      {
        key: 'endGripSize',
        type: 'number',
      },
      {
        key: 'type',
        type: 'select',
        options: ['normal', 'data'],
      },
      {
        key: 'position',
        type: 'select',
        options: ['bottom', 'top'],
      },
    ],
    isArray: false,
  },
  {
    name: 'scrollbarY',
    config: [
      {
        key: 'enable',
        type: 'toggle',
      },
      {
        key: 'width',
        type: 'number',
      },
      {
        key: 'startGripSize',
        type: 'number',
      },
      {
        key: 'endGripSize',
        type: 'number',
      },
    ],
    isArray: false,
  },
  {
    name: 'xRenderer',
    config: [
      { key: 'rotation', type: 'select', options: ['-90', '-45', '0'] },
      { key: 'centerY', type: 'select', options: ['0', '50', '100'] },
      { key: 'centerX', type: 'select', options: ['0', '50', '100'] },
      { key: 'marginTop', type: 'number' },
      { key: 'breakWords', type: 'toggle' },
      {
        key: 'textAlign',
        type: 'select',
        options: ['center', 'start', 'end', 'left', 'right'],
      },
      { key: 'fontSize', type: 'number' },
      { key: 'visible', type: 'toggle' },
    ],
  },
];

interface IScrollbarX extends IScrollbar {
  height: number;
  type: 'normal' | 'data';
  position: 'top' | 'bottom';
}

interface IScrollbarY extends IScrollbar {
  width: number;
}
