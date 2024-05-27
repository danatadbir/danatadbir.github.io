import { IOutputs, ITopic } from 'src/app/Dashboard/utils/Config';
import {
  IContentSetting,
  IViewSetting,
} from 'src/app/Dashboard/utils/Interfaces/Components.interface';

// MAP
export interface IMap {
  name: string;
  content: IMapContent[];
  view: IMapView;
}

export interface IMapContent {
  topic: ITopic;
  outputs: IOutputs;
  Equivalent: string;
  device: string;
  isApi: boolean;
  isLinked: boolean;
  latitude: number;
  longitude: number;
}

export interface IMapView {
  labels: { title: string };
  options: {
    MaxZoom: number;
    MinZoom: number;
    ScrollWheel: boolean;
    ZoomControl: boolean;
  };
}

const MapView: IMapView = {
  labels: {
    title: 'Map Title',
  },
  options: {
    MaxZoom: 15,
    MinZoom: 1,
    ScrollWheel: true,
    ZoomControl: true,
  },
};
const MapContent: IMapContent[] = [];
export const MapConfig: IMap = {
  name: 'Map',
  content: MapContent,
  view: MapView,
};

export const MapContentSettings: IContentSetting[] = [
  {
    key: 'Equivalent',
    type: 'text',
  },
  {
    key: 'latitude',
    type: 'number',
  },
  {
    key: 'longitude',
    type: 'number',
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
export const MapViewSettings: IViewSetting[] = [
  {
    name: 'labels',
    config: [{ key: 'title', type: 'text' }],
  },
  {
    name: 'options',
    config: [
      { key: 'MaxZoom', type: 'number' },
      { key: 'MinZoom', type: 'number' },
      { key: 'ScrollWheel', type: 'toggle' },
      { key: 'ZoomControl', type: 'toggle' },
    ],
  },
];
