export interface IBorder {
  BorderWidth: number;
  BorderRadius: number;
  BorderColor: string;
}

export interface ITopic {
  id: string;
  name: string;
}

export interface IOutput {
  type: string;
  name: string;
}

export interface IOutputV2 {
  field: string, time: string, value: string
}

export interface IOutputs {
  read: IOutput;
  write?: IOutput;
}
