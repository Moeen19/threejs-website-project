import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// canvas
const canvas = document.getElementById("canvas");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// textures
const bgTexture = new THREE.TextureLoader().load("./textures/teaser.png");
const donutTexture = new THREE.TextureLoader().load(
  "./textures/Donut_texture.jpg"
);
const cheeseTexture = new THREE.TextureLoader().load("./textures/cheese.jpg");
const cricketTexture = new THREE.TextureLoader().load(
  "./textures/cricketjpg.jpg"
);
const rickTexture = new THREE.TextureLoader().load("./textures/rickroll.jpg");

// scene
const scene = new THREE.Scene();
scene.background = bgTexture;

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 30;
camera.position.y = 2;

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);

// Torus Geometry
const torusGeo = new THREE.TorusGeometry(10, 3, 16, 100);

// Torus mat
const torusMat = new THREE.MeshStandardMaterial({
  map: donutTexture,
});

// torus mesh
const torusMesh = new THREE.Mesh(torusGeo, torusMat);
scene.add(torusMesh);

// Box Geo
const boxGeo = new THREE.BoxGeometry(5, 5, 5);

// Box Mat
const boxMat = new THREE.MeshStandardMaterial({
  map: cheeseTexture,
});

// box mesh
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
boxMesh.position.z = 30;
scene.add(boxMesh);

// Box2 Geo
const boxGeo2 = new THREE.BoxGeometry(5, 5, 5);

// Box2 Mat
const boxMat2 = new THREE.MeshStandardMaterial({
  map: cheeseTexture,
});

// box2 mesh
const boxMesh2 = new THREE.Mesh(boxGeo2, boxMat2);
boxMesh2.position.z = 30;
boxMesh2.position.x = 20;
scene.add(boxMesh2);

// Box3 Geo
const boxGeo3 = new THREE.BoxGeometry(5, 5, 5);

// Box3 Mat
const boxMat3 = new THREE.MeshStandardMaterial({
  map: cheeseTexture,
});

// box3 mesh
const boxMesh3 = new THREE.Mesh(boxGeo3, boxMat3);
boxMesh3.position.z = 30;
boxMesh3.position.x = -20;
scene.add(boxMesh3);

// sphere geometry
const sphereGeo = new THREE.SphereGeometry(7, 32, 16);

// sphere Mat
const sphereMat = new THREE.MeshStandardMaterial({
  map: cricketTexture,
});

// sphere mesh
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.position.z = 50;
scene.add(sphereMesh);

// box4 geo
const boxGeo4 = new THREE.BoxGeometry(15, 15, 15);

// box4 mat
const boxMat4 = new THREE.MeshStandardMaterial({
  map: rickTexture,
});

// rick Mesh
const rick = new THREE.Mesh(boxGeo4, boxMat4);
rick.position.z = 70;
scene.add(rick);

// lights
const AmbientLight = new THREE.AmbientLight(0xffffff);
scene.add(AmbientLight);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

// scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // box rotation
  boxMesh.rotation.x += 0.03;
  boxMesh.rotation.y += 0.03;

  // box2 rotation
  boxMesh2.rotation.x += 0.03;
  boxMesh2.rotation.y += 0.03;

  // box3 rotation
  boxMesh3.rotation.x += 0.03;
  boxMesh3.rotation.y += 0.03;

  // Sphere rotation
  sphereMesh.rotation.y += 0.02;
  sphereMesh.rotation.x += 0.02;
  sphereMesh.rotation.z += 0.02;

  // rick rotation
  rick.rotation.x += 0.02;
  rick.rotation.y += 0.02;

  // camera position
  // camera.position.x = t * 0.01;
  camera.position.y = t * -0.007;
  camera.position.z = t * -0.03;
}

document.body.onscroll = moveCamera;

// animate
function animate() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);

  // Torus rotation
  torusMesh.rotation.y += 0.02;
  torusMesh.rotation.x += 0.01;
  torusMesh.rotation.z += 0.01;

  controls.update();
}
animate();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
