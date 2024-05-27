import {
  IContentSetting,
  IViewSetting,
} from '../models';
import { IOutputs, ITopic } from '../models';

let bandsData = [
  {
    color: '#fdae19',
    lowScore: 0,
    highScore: 20,
  },
  {
    color: '#f3eb0c',
    lowScore: 20,
    highScore: 40,
  },
  {
    color: '#b0d136',
    lowScore: 40,
    highScore: 60,
  },
  {
    color: '#54b947',
    lowScore: 60,
    highScore: 80,
  },
  {
    color: '#0f9747',
    lowScore: 80,
    highScore: 100,
  },
];

export interface IGaugeChart {
  name: string;
  content: IGaugeChartContent[];
  view: IGaugeChartView;
}

export interface IGaugeChartContent {
  topic: ITopic;
  outputs: IOutputs;
}

export interface IGaugeChartView {
  labels: { title: string };
  chart: {
    startAngle: number;
    endAngle: number;
    BackgroundColor?: string
  };
  axisRenderer: {
    innerRadius: number;
  };
  xAxis: {
    min: number;
    max: number;
  };
  clockHand: {
    pinRadius: number;
    radius: number;
    bottomWidth: number;
  };
  label: {
    fill: string;
    fontSize: number;
  };
  bands: {
    color: string;
    lowScore: number;
    highScore: number;
  }[];
}

const GaugeChartView: IGaugeChartView = {
  labels: {
    title: 'Gauge Chart Title',
  },
  chart: {
    startAngle: 180,
    endAngle: 360,
  },
  axisRenderer: {
    innerRadius: -15,
  },
  xAxis: {
    min: 0,
    max: 100,
  },
  clockHand: {
    pinRadius: 10,
    radius: 90,
    bottomWidth: 10,
  },
  label: {
    fill: '#ffffff',
    fontSize: 75,
  },
  bands: bandsData,
};
const GaugeChartContent: IGaugeChartContent[] = [];
// const GaugeChartContent = null;
export const GaugeChartConfig: IGaugeChart = {
  name: 'Gauge',
  content: GaugeChartContent,
  view: GaugeChartView,
};

export const GaugeChartContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
];
export const GaugeChartViewSettings: IViewSetting[] = [
  {
    name: 'labels',
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'chart',
    config: [
      { key: 'BackgroundColor', type: 'color' },
      {key: 'startAngle', type: 'number'},
      {key: 'endAngle', type: 'number'}
    ],
  },
  {
    name: 'axisRenderer',
    config: [{ key: 'innerRadius', type: 'number' }],
  },
  {
    name: 'xAxis',
    config: [
      { key: 'min', type: 'number' },
      { key: 'max', type: 'number' },
    ],
  },
  {
    name: 'clockHand',
    config: [
      { key: 'pinRadius', type: 'number' },
      { key: 'radius', type: 'number' },
      { key: 'bottomWidth', type: 'number' },
    ],
  },
  {
    name: 'label',
    config: [
      { key: 'fill', type: 'color' },
      { key: 'fontSize', type: 'number' },
    ],
  },
  {
    name: 'bands',
    isArray: true,
    config: [
      { key: 'color', type: 'color' },
      { key: 'lowScore', type: 'number' },
      { key: 'highScore', type: 'number' },
    ],
  },
];
