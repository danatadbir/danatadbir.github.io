import {IContentSetting, IViewSetting} from "../models";
import {IOutputs, ITopic} from "../models";

export interface ILinkedTableConfig {
  name: string,
  content: ILinkedTableContent[];
  view: ILinkedTableView;
}

export interface ILinkedTableContent {
  topic: ITopic;
  outputs: IOutputs;
  Equivalent: string;
  Unit: string;
}

export interface ILinkedTableView {
  Labels: { Title: string },
  Border: { BorderWidth: number, BorderRadius: number, BorderColor: string },
  Content: { BodyColor: string, HeaderColor: string },
  Chart: { HeaderColor: string, RowColor: string, Search: boolean, Pagination: boolean, No: boolean, Action: boolean }
}

export const LinkedTableConfig: ILinkedTableConfig = {
  name: 'LinkedTable',
  content: [],
  view: {
    Labels: {Title: 'table title'},
    Border: {BorderWidth: 0, BorderColor: '#FFFFFF', BorderRadius: 10},
    Chart: {HeaderColor: '#FFFFFF', RowColor: '#FFFFFF', Search: true, Pagination: true, No: true, Action: true},
    Content: {BodyColor: '#0a0a0a', HeaderColor: '#0a0a0a'}
  }
};

//Settings
export const LinkedTableContentSettings: IContentSetting[] = [
  {
    key: 'Equivalent',
    type: 'text',
  },
  {
    key: 'Unit',
    type: 'text',
  },
  {
    key: 'content',
    type: 'array'
  }
];
export const LinkedTableViewSettings: IViewSetting[] = [
  {
    name: "Labels",
    config: [
      {key: 'Title', type: 'text'}
    ]
  },
  {
    name: "Border",
    config: [
      {key: 'BorderWidth', type: 'number'},
      {key: 'BorderRadius', type: 'number'},
      {key: 'BorderColor', type: 'color'}
    ],
  },
  {
    name: "Content",
    config: [
      {key: 'BodyColor', type: 'color'},
      {key: 'HeaderColor', type: 'color'},
    ]
  },
  {
    name: "Chart",
    config: [
      {key: "HeaderColor", type: "color"},
      {key: "RowColor", type: "color"},
      {key: "Search", type: "toggle"},
      {key: "Pagination", type: "toggle"},
      {key: "No", type: "toggle"},
      {key: "Action", type: "toggle"}
    ]
  }
];
