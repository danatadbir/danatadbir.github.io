import { ICursor, IScrollbar } from './config.interface';
import { Color } from '@amcharts/amcharts5';
import { IChartSetting } from './config.interface';
import {
  IContentSetting,
  IViewSetting,
} from '../models';
import { IOutputs, ITopic } from '../models';

export interface ILineChart {
  name: string;
  content: ILineChartContent[];
  view: ILineChartView;
}

export interface ILineChartContent {
  topic: ITopic;
  outputs: IOutputs;
  color: Color;
}

export interface ILineChartView {
  labels: { title: string };
  chart: IChartSetting;
  cursor: ICursor;
  scroll: IScrollbar;
  series: {
    color: string;
  };
}

const LineChartView: ILineChartView = {
  labels: {
    title: 'Line Chart Title',
  },
  chart: {
    panX: true,
    panY: true,
    wheelX: 'zoomXY',
    wheelY: 'zoomXY',
    pinchZoomX: true,
  },
  series: {
    color: '#74b9ff',
  },
  cursor: {
    lineX: true,
    lineY: true,
  },
  scroll: {
    enable: true,
    endGripSize: 0.5,
    startGripSize: 0.5,
  },
};
const LineChartContent: ILineChartContent[] = [];
export const LineChartConfig: ILineChart = {
  name: 'LineChart',
  content: LineChartContent,
  view: LineChartView,
};
export const LineChartContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
];
export const LineChartViewSettings: IViewSetting[] = [
  {
    name: 'labels',
    config: [{ key: 'title', type: 'text' }],
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
    name: 'series',
    config: [{ key: 'color', type: 'color' }],
  },
  {
    name: 'scroll',
    config: [
      { key: 'enable', type: 'toggle' },
      { key: 'type', type: 'select', options: ['normal', 'sb'] },
    ],
  },
];
