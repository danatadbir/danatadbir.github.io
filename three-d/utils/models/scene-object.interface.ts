export interface SceneObject {
  id: number;
  geometry?: THREE.BufferGeometry;
  materials: THREE.MeshBasicMaterial[]; //THREE.Material;
  meshs: THREE.Mesh[];
  object: THREE.Object3D; //THREE.Mesh;
  // item: ToolBoxItem;

  _currentColors?: string[];
}
