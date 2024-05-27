export interface IFile {
  name: string;
  type: '.fbx' | '.obj' | '.gltf' | '.glb' | '.jpeg' | '.jpg' | '.png' | '.svg';
  file: File;
  volume: number;
}

export interface IFileData {
  file: IFile;
  thumbnail?: IFile;
  type: 'Background' | 'Component';
  title: string;
  scope: string;
}
