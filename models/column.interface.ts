import * as am5 from '@amcharts/amcharts5';
import { IChartSetting, ICursor, IXRenderer } from './config.interface';
import {
  IContentSetting,
  IMultiContentSetting,
  IViewSetting,
} from '../models';
import { IOutput, IOutputs, ITopic } from '../models';

//COLUMN CHART
export interface IColumnChart {
  name: string;
  content?: IColumnChartContent[];
  multiContent?: IMultiColumnChartContent[];
  view: IColumnChartView;
}

export interface IMultiColumnChartContent {
  label: string;
  columns: IColumnChartContent[];
}

export interface IColumnChartContent {
  topic: ITopic;
  outputs: IOutputs;
  Equivalent?: string;
  color: string;
  value?: number;
  outputs_read?: IOutput;
}

export interface IColumnChartSetting extends IChartSetting {
  min: number;
  max: number;
  clusterCount: number;
  BackgroundColor: string;
}

export interface IColumnChartView {
  labels: { title: string };
  chart: IColumnChartSetting;
  cursor: ICursor;
  xRenderer: IXRenderer;
}

const ColumnChartView: IColumnChartView = {
  labels: {
    title: 'Column Chart Title',
  },
  chart: {
    min: 0,
    max: 100,
    clusterCount: 1,
    panX: false,
    panY: false,
    wheelX: 'none',
    wheelY: 'none',
    pinchZoomX: false,
    BackgroundColor: 'transparent',
  },
  cursor: {
    lineX: false,
    lineY: false,
  },
  xRenderer: {
    rotation: -90,
    centerY: '50',
    centerX: '100',
    marginTop: 1,
    breakWords: true,
    textAlign: 'center',
    fontSize: 10,
    visible: true,
  },
};
const ColumnChartContent: IColumnChartContent[] = [];
export const ColumnChartConfig: IColumnChart = {
  name: 'ColumnChart',
  content: ColumnChartContent,
  multiContent: [],
  view: ColumnChartView,
};

export const ColumnChartMultiContentSettings: IMultiContentSetting[] = [
  {
    _key: 'label',
    content: [
      {
        key: 'label',
        type: 'text',
      },
      {
        key: 'columns',
        type: 'dynamicContent',
        content: {
          _key: 'outputs_read',
          fixedCount$: 'chart.clusterCount',
          content: [
            {
              key: 'device',
              type: 'deviceSelector',
            },
            {
              key: 'topic',
              type: 'topicSelector',
            },
            {
              key: 'outputs_read',
              title: 'Read From Output',
              type: 'outputsSelector',
            },
            {
              key: 'Equivalent',
              type: 'text',
            },
            {
              key: 'color',
              type: 'color',
            },
            // {
            //   key: 'isLinked',
            //   type: 'toggle',
            // },
            {
              key: 'isApi',
              type: 'toggle',
            },
            {
              key: 'api',
              type: 'text',
            },
          ],
        },
      },
    ],
  },
];

export const ColumnChartContentSettings: IContentSetting[] = [
  {
    key: 'Equivalent',
    type: 'text',
  },
  {
    key: 'color',
    type: 'color',
  },
  {
    key: 'isLinked',
    type: 'boolean',
  },
  {
    key: 'isApi',
    type: 'boolean',
  },
  {
    key: 'api',
    type: 'text',
  },
  {
    key: 'content',
    type: 'array',
  },
];
export const ColumnChartViewSettings: IViewSetting[] = [
  {
    name: 'labels',
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'chart',
    config: [
      { key: 'BackgroundColor', type: 'color' },
      { key: 'min', type: 'number' },
      { key: 'max', type: 'number' },
      { key: 'clusterCount', type: 'number' },
      { key: 'panX', type: 'toggle' },
      { key: 'panY', type: 'toggle' },
      {
        key: 'wheelX',
        type: 'select',
        options: ['zoomX', 'zoomY', 'zoomXY', 'panX', 'panY', 'panXY', 'none'],
      },
      {
        key: 'wheelY',
        type: 'select',
        options: ['zoomX', 'zoomY', 'zoomXY', 'panX', 'panY', 'panXY', 'none'],
      },
      { key: 'pinchZoomX', type: 'toggle' },
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
