import {IContentSetting, IViewSetting} from "../../../Dashboard/utils/Interfaces/Components.interface";
import {ITableConfig} from "./Table.interface";
import {ILinkedTableConfig} from "./linkedTable.interface";
import {ICard} from "./card.interface";
import {IColumnChart} from "./column.interface";
import {ILineChart} from "./line.interface";
import {IGaugeChart} from "./gauge.interface";
import {ISliderConfig} from "./slider.interface";
import {IButtonConfig} from "./button.interface";

export interface IChangeSourceConfig {
  content: IChangeSourceContent | null;
  view: IChangeSourceView;
}

export const changeSourceView: IChangeSourceView = {
  Labels: {
    title: 'Title'
  },
  Button: {
    color: '#FF0000'
  }
}

export const ChangeSourceConfig: IChangeSourceConfig = {
  content: null,
  view: changeSourceView
};


export interface IChangeSourceContent {
  selectedComponentId: string;
  config: ITableConfig | ILinkedTableConfig | ICard | IColumnChart | ILineChart | IGaugeChart | ISliderConfig | IButtonConfig;
}

export interface IChangeSourceView {
  Labels: { title: string };
  Button: { color: string };
}
