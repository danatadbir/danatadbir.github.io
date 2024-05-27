export type EditorMode = 'add' | 'edit' | 'remove';

export type EditingAction = 'on' | 'approve' | 'revert' | 'off';

export type ConfigTabType = 'background' | 'components' | 'labels';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export enum Action {
  dialog,
  hover,
  redirect,
  url,
}
