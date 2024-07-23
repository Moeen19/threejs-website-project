import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import HDRfile from "./assets/wolf/MR_INT-005_WhiteNeons_NAD.hdr";

const loader = document.getElementById("loader")
const runBtn = document.getElementById("Run");
const walkBtn = document.getElementById("Walk");
const idleBtn = document.getElementById("Idle");
const sitBtn = document.getElementById("Sit");
const creepBtn = document.getElementById("Creep");

console.log(loader)

// setTimeout(() => {
//   console.log('k')
 
// }, 35000)

//canvas
const canvas = document.getElementById("WebGl");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = -3;
camera.position.x = -2
camera.position.y = 1.8

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 8;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0.7, 5, 5);
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.castShadow = true;
scene.add(directionalLight);

// gltf initialize
const gltfLoader = new GLTFLoader();

// rgbeLoader
const rgbeLoader = new RGBELoader();

let mixer;
let action;
let model;
let animations;

rgbeLoader.load(HDRfile, function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;

  gltfLoader.load("./assets/wolf/output.glb", function (gltf) {
    model = gltf.scene;
    animations = gltf.animations;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mixer = new THREE.AnimationMixer(model);
    scene.add(model);
    
    loader.style.opacity = 0
    canvas.style.opacity = 100
  });
});


// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// select animations
function selectAnimation(No) {
  if (action) {
    action.stop();
  }
  action = mixer.clipAction(animations[No]);
  action.play();
}

// animate
function animate() {
  renderer.render(scene, camera);
  controls.update();
  runBtn.addEventListener("click", () => {
    selectAnimation(0);
  });
  walkBtn.addEventListener("click", () => {
    selectAnimation(1);
  });
  creepBtn.addEventListener("click", () => {
    selectAnimation(2);
  });
  idleBtn.addEventListener("click", () => {
    selectAnimation(3);
  });
  sitBtn.addEventListener("click", () => {
    selectAnimation(4);
  });
  if (mixer) {
    mixer.update(0.02);
  }
  window.requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

animate();
