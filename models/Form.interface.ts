import { IOutputs, ITopic } from '../models';
import {
  IContentSetting,
  IViewSetting,
} from '../models';

export interface IFormFieldConfig {
  content: IFormFieldContent;
  view: IFormFieldView;
}

// Range FormField Config
export interface IFormFieldContent {
  topic: ITopic | null;
  outputs: IOutputs | null;
  defaultValue: string | null;
  Name: string;
  type: 'text' | 'number';
}

export interface IFormFieldView {
  Appearance: {
    appearance: 'outline' | 'fill';
  };
  Labels: {
    hint: string | null;
    label: string | null;
  };
}

export const FormFieldView: IFormFieldView = {
  Labels: {
    hint: 'Hint',
    label: 'Label',
  },
  Appearance: {
    appearance: 'outline',
  },
};
export const FormFieldContentSettings: IContentSetting[] = [
  {
    key: 'isLinked',
    type: 'boolean',
  },
  { key: 'Name', type: 'text' },
  { key: 'defaultValue', type: 'text' },
  { key: 'type', type: 'select', options: ['text', 'number'] },
];
export const FormFieldViewSettings: IViewSetting[] = [
  {
    name: 'Appearance',
    isArray: false,
    config: [
      { key: 'appearance', type: 'select', options: ['outline', 'fill'] },
    ],
  },
  {
    name: 'Labels',
    isArray: false,
    config: [
      { key: 'hint', type: 'text' },
      { key: 'label', type: 'text' },
    ],
  },
];
export const FormFieldContent: IFormFieldContent = {
  Name: 'Field',
  type: 'text',
  defaultValue: null,
  topic: null,
  outputs: null,
};
export const FormFieldConfig: IFormFieldConfig = {
  content: FormFieldContent,
  view: FormFieldView,
};

export interface ISubmit {
  content: {
    idList: string[];
    selectedForm: string | null;
  };
  view: {
    label: 'Submit';
    color: 'primary' | 'accent' | 'warn';
  };
}

const SubmitViewSetting: IContentSetting[] = [
  {
    key: 'Appearance',
    type: 'select',
    options: ['outline', 'fill'],
  },
  {
    key: 'Label',
    type: 'text',
  },
  {
    key: 'Hint',
    type: 'text',
  },
];

export enum DynamicFormControlType {
  TEXT,
  NUMBER,
  EMAIL,
  PASSWORD,
  PHONE,
  DATE,
  SELECT,
  TIME,
  TEXTAREA,
  CHECKBOX,
  ARRAY,
}
