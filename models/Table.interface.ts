import { IContentSetting, IViewSetting } from "../models";
import { IOutputs, ITopic } from "../models";
import { Action, IAction } from "../models";

export interface ITableConfig {
  name: string;
  content: ITableContent[];
  view: ITableView;
}

export interface ITableContent {
  topic: ITopic;
  outputs: IOutputs;
  device?: string;
}

export interface ITableView {
  Labels: { Title: string, TitleColor: string };
  Border: { BorderWidth: number; BorderRadius: number; BorderColor: string };
  Content: {
    BodyColor: string;
    HeaderColor: string;
    BodyTextColor: string;
    HeaderTextColor: string;
  };
  Chart: {
    Columns: string[];
    Pagination: boolean;
    No: boolean;
    Search: boolean;
    Action: boolean;
    Select: boolean;
  },
  Action: IAction
}

const TableContent: ITableContent[] = [];
export const TableConfig: ITableConfig = {
  name: 'Table',
  content: TableContent,
  view: {
    Labels: { Title: 'table title', TitleColor: '#0a0a0a' },
    Border: { BorderWidth: 0, BorderColor: '#FFFFFF', BorderRadius: 10 },
    Chart: {
      Columns: ['device', 'topic', 'name', 'date'],
      Search: false,
      Pagination: true,
      No: true,
      Action: true,
      Select: false
    },
    Content: {
      BodyTextColor: '#0a0a0a',
      HeaderTextColor: '#0a0a0a',
      HeaderColor: '#FFFFFF',
      BodyColor: '#FFFFFF',
    },
    Action: {
      type: Action.dialog,
      dialogColor: '#FFFFFF',
      textColor: '#333333'
    }
  }
};

//Settings
export const TableContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
  {
    key: 'content',
    type: 'array',
  },
];
export const TableViewSettings: IViewSetting[] = [
  {
    name: "Labels",
    config: [
      { key: 'Title', type: 'text' },
      { key: 'TitleColor', type: 'color' }
    ]
  },
  {
    name: 'Border',
    config: [
      { key: 'BorderWidth', type: 'number' },
      { key: 'BorderRadius', type: 'number' },
      { key: 'BorderColor', type: 'color' }
    ],
  },
  {
    name: 'Content',
    config: [
      { key: 'BodyColor', type: 'color' },
      { key: 'HeaderColor', type: 'color' },
      { key: 'BodyTextColor', type: 'color' },
      { key: 'HeaderTextColor', type: 'color' },
    ]
  },
  {
    name: 'Chart',
    config: [
      { key: "Columns", type: "chips", options: ['device', 'topic', 'name', 'date'], multiple: true },
      { key: "Search", type: "toggle" },
      { key: "Pagination", type: "toggle" },
      { key: "No", type: "toggle" },
      { key: "Action", type: "toggle" },
      { key: "Select", type: "toggle" }
    ]
  },
  {
    name: "Action",
    config: [
      { key: "dialogColor", type: "color" },
      { key: "textColor", type: "color" },
      { key: "type", type: "action" },
    ]
  }
];
