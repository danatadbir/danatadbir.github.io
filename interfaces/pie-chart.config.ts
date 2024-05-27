import * as am5 from '@amcharts/amcharts5';

import {
  IPieChart,
  IPieChartContent,
  IPieChartLegend,
  IPieChartView,
} from '../models';
import {
  IContentSetting,
  IViewSetting,
} from 'src/app/Dashboard/utils/Interfaces/Components.interface';
import { IPieChartSettings } from '@amcharts/amcharts5/percent';

export const PIE_CHART_DATA: Array<IPieChartContent> = [
  {
    topic: {
      name: 'Lithuania',
    },
    color: '#67b7dc',
  },
  {
    topic: {
      name: 'Czechia',
    },
    color: '#6794dc',
  },
  {
    topic: {
      name: 'Ireland',
    },
    color: '#6771dc',
  },
  {
    topic: {
      name: 'Germany',
    },
    color: '#a367dc',
  },
  {
    topic: {
      name: 'Australia',
    },
    color: '#dc67ce',
  },
];

export const PIE_CHART_SERIES_CONTAINER: am5.ILabelSettings = {
  textAlign: 'center',
  centerY: 0,
  centerX: 0,
  text: '',
};

export const PIE_CHART_SETTINGS: IPieChartSettings = {
  dy: 0,
  centerY: 20,
  centerX: 0,
  paddingTop: 5,
  paddingRight: 5,
  paddingBottom: 5,
  paddingLeft: 5,
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  radius: 100,
};

export const PIE_CHART_TOOLTIP = {
  ticks: false,
  labels: false,
};

export const PIE_CHART_RADIAL_GRADIENT_ITEMS = [
  {
    brighten: 0,
  },
  {
    brighten: -0.8,
  },
  {
    brighten: -0.5,
  },
  {
    brighten: 0,
  },
  {
    brighten: -0.5,
  },
];

export const PIE_CHART_LEGEND: IPieChartLegend = {
  hasLegend: true,
  y: 75,
  x: 8,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  layoutSetting: 'gridLayout',
};

export const PieChartView: IPieChartView = {
  labels: {
    title: 'Pie Chart Title',
  },
  chart: PIE_CHART_SETTINGS,
  seriesContainer: PIE_CHART_SERIES_CONTAINER,
  tooltip: PIE_CHART_TOOLTIP,
  chartMode: { radialGradient: false, variableRadius: false },
  legend: PIE_CHART_LEGEND,
};

const PieChartContent: IPieChartContent[] = [];
export const PieChartConfig: IPieChart = {
  name: 'PieChart',
  content: PieChartContent,
  view: PieChartView,
};
export const PieChartContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
  {
    key: 'color',
    type: 'color',
  },
  {
    key: 'content',
    type: 'array',
  },
];
export const PieChartViewSettings: IViewSetting[] = [
  {
    name: 'labels',
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'chart',
    config: [
      { key: 'BackgroundColor', type: 'color' },
      { key: 'startAngle', type: 'number' },
      { key: 'endAngle', type: 'number' },
      { key: 'innerRadius', type: 'number' },
      { key: 'radius', type: 'number' },
      { key: 'dy', type: 'number' },
      { key: 'centerY', type: 'number' },
      { key: 'centerX', type: 'number' },
      { key: 'paddingTop', type: 'number' },
      { key: 'paddingRight', type: 'number' },
      { key: 'paddingBottom', type: 'number' },
      { key: 'paddingLeft', type: 'number' },
    ],
  },
  {
    name: 'seriesContainer',
    config: [
      { key: 'text', type: 'text' },
      {
        key: 'textAlign',
        type: 'select',
        options: ['center', 'left', 'right', 'top', 'bottom'],
      },
      { key: 'centerX', type: 'number' },
      { key: 'centerY', type: 'number' },
    ],
  },
  {
    name: 'tooltip',
    config: [
      { key: 'ticks', type: 'toggle' },
      { key: 'labels', type: 'toggle' },
    ],
  },
  {
    name: 'chartMode',
    config: [
      { key: 'radialGradient', type: 'toggle' },
      { key: 'variableRadius', type: 'toggle' },
    ],
  },
  {
    name: 'legend',
    config: [
      { key: 'hasLegend', type: 'toggle' },
      { key: 'x', type: 'number' },
      { key: 'y', type: 'number' },
      {
        key: 'layoutSetting',
        type: 'select',
        options: ['gridLayout', 'verticalLayout', 'horizontalLayout'],
      },
      { key: 'marginTop', type: 'number' },
      { key: 'marginLeft', type: 'number' },
      { key: 'marginRight', type: 'number' },
      { key: 'marginBottom', type: 'number' },
    ],
  },
];
