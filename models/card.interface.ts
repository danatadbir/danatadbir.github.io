import {
  IContentSetting,
  IViewSetting,
} from '../models';
import { IOutputs, ITopic } from '../models';

export interface ICard {
  name: string;
  content: ICardContent;
  view: ICardView;
}

export interface ICardContent {
  Title: string;
  Subtitle?: string;
  Unit: string;
  Label: string;
  topic: ITopic | null;
  outputs: IOutputs | null;
}

export interface ICardView {
  Card: {
    BackgroundColor: string;
    BorderColor: string;
  };
  Title: {
    fontSize: string;
    color: string;
    position: 'TopCenter' | 'TopStart' | 'TopEnd';
  };
  Unit: {
    fontSize: string;
    color: string;
  };
  Label: {
    fontSize: string;
    color: string;
  };
}

const CardView: ICardView = {
  Card: {
    BackgroundColor: '#6F90D5',
    BorderColor: '#6F90D5',
  },
  Title: {
    fontSize: '25',
    color: '#FFFFFF',
    position: 'TopCenter',
  },
  Label: {
    fontSize: '20',
    color: '#FFFFFF',
  },
  Unit: {
    fontSize: '15',
    color: '#FFFFFF',
  },
};
const CardContent = {
  Title: 'Title',
  Subtitle: '',
  Label: 'Label',
  Unit: 'Unit',
  topic: null,
  outputs: null,
};
export const CardConfig: ICard = {
  name: 'Card',
  content: CardContent,
  view: CardView,
};

export const CardContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
  {
    key: 'isApi',
    type: 'boolean',
  },
  { key: 'api', type: 'text' },
  { key: 'Title', type: 'text' },
  { key: 'Subtitle', type: 'text' },
  { key: 'Label', type: 'text' },
  { key: 'Unit', type: 'text' },
];
export const CardViewSettings: IViewSetting[] = [
  {
    name: 'Card',
    config: [
      { key: 'BackgroundColor', type: 'color' },
      { key: 'BorderColor', type: 'color' },
    ],
  },
  {
    name: 'Title',
    config: [
      { key: 'fontSize', type: 'number' },
      { key: 'color', type: 'color' },
      {
        key: 'position',
        type: 'select',
        options: ['TopCenter', 'TopStart', 'TopEnd'],
      },
    ],
  },
  {
    name: 'Unit',
    config: [
      { key: 'fontSize', type: 'number' },
      { key: 'color', type: 'color' },
    ],
  },
  {
    name: 'Label',
    config: [
      { key: 'fontSize', type: 'number' },
      { key: 'color', type: 'color' },
    ],
  },
];
