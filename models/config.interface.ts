import * as am5 from '@amcharts/amcharts5';
import {
  IGraphicsSettings,
  IScrollbarSettings,
  Scrollbar,
} from '@amcharts/amcharts5';
import { IXYChartSettings } from '@amcharts/amcharts5/xy';

export interface ICursor {
  lineX: boolean;
  lineY: boolean;
}

export interface IChartSetting extends IXYChartSettings {
  panX: boolean;
  panY: boolean;
  wheelX: 'zoomX' | 'zoomY' | 'zoomXY' | 'panX' | 'panY' | 'panXY' | 'none';
  wheelY: 'zoomX' | 'zoomY' | 'zoomXY' | 'panX' | 'panY' | 'panXY' | 'none';
  pinchZoomX: boolean;
  BackgroundColor?: string;
}

export interface IXRenderer {
  rotation: -90 | -45 | 0;
  centerY: string;
  centerX: string;
  marginTop: number;
  breakWords: boolean;
  textAlign: 'center' | 'start' | 'end' | 'left' | 'right';
  fontSize: number;
  visible: boolean;
}

export interface IBullet {
  size: number;
}

export interface IScrollbar {
  enable: boolean;
  startGripSize: number;
  endGripSize: number;
}

export interface ITarget {
  enabled: boolean;
  value: number;
  title: string;
}
