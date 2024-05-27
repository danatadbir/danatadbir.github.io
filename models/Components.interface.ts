export interface IContentSetting {
  key: string;
  type: 'text' | 'color' | 'select' | 'boolean' | 'number' | 'array';
  options?: string[];
  multiple?: boolean;
}

export interface IMultiContentSetting {
  _key: string
  content: IMultiContentSettingContent[]
  fixedCount$?: string
}

export interface IMultiContentSettingContent {
  key: string;
  title?: string;
  type: 'text' | 'color' | 'select' | 'toggle' | 'number' | 'dynamicContent' | 'deviceSelector' | 'topicSelector' | 'outputsSelector';
  options?: string[];
  content?: IMultiContentSetting
  multiple?: boolean;

}
export interface IViewSetting {
  name: string;
  isArray?: boolean;
  config: {
    key: string;
    type: 'text' | 'color' | 'select' | 'toggle' | 'number' | 'chips' | 'action';
    options?: string[];
    multiple?: boolean;
  }[];
}

export interface ISettingFormConfig {
  title: string;
  multiDevice: boolean;
  content: IContentSetting[];
  view: IViewSetting[];
  multiContent?: IMultiContentSetting[];
}
