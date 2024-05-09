import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';


let scene, camera, renderer;


function randomGenerate(min, max) {

  let random = Math.random() * (max - min) + min;
  return random;

}

export function planGeo() {


  let container = document.getElementById('container');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 2000);
  camera.position.set(0, 0.5, 1).setLength(12);
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  scene.add(new THREE.GridHelper(200, 200, 100, 100));

  const fbxLoader = new FBXLoader();
//https://ctplus.i4twins.com/i4twins.fbx
  //https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx
  fbxLoader.load('https://ctplus.i4twins.com/i4Tw.fbx', (object) => {

    object.traverse(function (child) {
      console.log("ch", child)
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(object);

  });

  let controls = new OrbitControls(camera, renderer.domElement);

  let light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.setScalar(1);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));


  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);


  });

  function onWindowResize() {

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);

  }

};

var core = {}

export default core
