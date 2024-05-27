import { ICursor } from './config.interface';
import { Color } from '@amcharts/amcharts5';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

import { IOutputs, ITopic } from '../models';

export interface IProgressChart {
  name: string;
  content: IProgressChartContent[];
  view: IProgressChartView;
}

export interface IProgressChartContent {
  topic: ITopic;
  outputs: IOutputs;
  // color?: Color;
}``
export interface IProgressChartAxisLabel {
  text: string;
  category: string;
  fill?: number;
}
export interface IProgressSeries {
  category: number;
  value: number;
  currentBullet?: boolean;
  targetBullet?: boolean;
}

export interface IProgressChartView {
  labels: { title: string };
  chart: Partial<am5xy.IXYChartSettings>;
  bullet: {bullet:number};
  targetSettings: Partial<am5.ILabelSettings>;
  axisLabels: IProgressChartAxisLabel[];
  valueAxisSetting: Partial<am5xy.IValueAxisSettings<am5xy.AxisRenderer>>;
  cursor: ICursor;
  targetCircle: { radius: number; fill: number | string | Color };
  rangeColor: IProgressChartRangeColor[];
}
export interface IProgressChartRangeColor {
  start: number;
  end: number;
  color: string;
}

export interface IAxisLabelProgressChart {
  text: string;
  category: string;
  fill?: number;
}
