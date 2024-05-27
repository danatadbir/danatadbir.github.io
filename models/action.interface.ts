export enum Action {
  dialog,
  hover,
  redirect,
  url,
}

export enum Animation {
  motion,
  conditional,
}

export interface IAction {
  type: Action | null;
  component?: string;
  config?: any;
  description?: string;
  application?: string;
  dashboard?: string;
  dialogColor?: string;
  textColor?: string;
}
