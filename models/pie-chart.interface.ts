import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';


export interface IPieChart {
  name: string;
  content: IPieChartContent[];
  view: IPieChartView;
}

export interface IPieChartContent {
  topic: { name: string; id?: string };
  color:string
}

export interface IPieChartView {
  labels: { title: string };
  chart: Partial<am5xy.IXYChartSettings>;
  seriesContainer: am5.ILabelSettings;
  tooltip: IPieChartTooltip;
  chartMode: IPieChartMode;
  legend: IPieChartLegend;
}

export interface IPieChartMode {
  radialGradient: boolean;
  variableRadius: boolean;
}

export interface IPieChartLegend extends am5.ILegendSettings {
  hasLegend: boolean;
  layoutSetting: PieLayoutSetting;
}
export type PieLayoutSetting =
  | 'gridLayout'
  | 'verticalLayout'
  | 'horizontalLayout';

export interface IPieChartTooltip {
  ticks: boolean;
  labels: boolean;
}

export interface IAxisLabelPieChart {
  text: string;
  category: string;
  fill?: number;
}
