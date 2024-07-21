import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// canvas
const canvas = document.getElementById("WebGl");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// texture
const bgTexture = new THREE.TextureLoader().load("./textures/dark_texture.jpg")

// scene
const scene = new THREE.Scene();


// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 3.5

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)

// controls
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableZoom = false
// controls.enablePan = false

// IcoGeo
const icoGeo = new THREE.IcosahedronGeometry(1.2, 2)

// icoMat
const icoMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
})

// icoMesh
const icoMesh = new THREE.Mesh(icoGeo, icoMat)
scene.add(icoMesh)

// IcoGeo
const icoGeo2 = new THREE.IcosahedronGeometry(1.2, 2)

// icoMat
const icoMat2 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
})

// icoMesh2
const icoMesh2 = new THREE.Mesh(icoGeo2, icoMat2)
icoMesh2.position.x = 3
scene.add(icoMesh2)

// IcoGeo3
const icoGeo3 = new THREE.IcosahedronGeometry(1.2, 2)

// icoMat3
const icoMat3 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
})

// icoMesh3
const icoMesh3 = new THREE.Mesh(icoGeo3, icoMat3)
icoMesh3.position.x = -3
scene.add(icoMesh3)

// wireMat
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

// wire Mesh
const wireMesh = new THREE.Mesh(icoGeo, wireMat)
const wireMesh2 = new THREE.Mesh(icoGeo, wireMat)
const wireMesh3 = new THREE.Mesh(icoGeo, wireMat)
wireMesh.scale.setScalar(1.001)
wireMesh2.scale.setScalar(1.001)
wireMesh3.scale.setScalar(1.001)
icoMesh.add(wireMesh)
icoMesh2.add(wireMesh2)
icoMesh3.add(wireMesh3)

// lights
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight)

// animate
function animate(t = 0) {
  renderer.render(scene, camera);
  icoMesh.scale.setScalar(Math.cos((t * 0.001) + 1.0))
  icoMesh.rotation.y += 0.06

  icoMesh2.scale.setScalar(Math.cos((t * 0.001) - 1.0))
  icoMesh2.rotation.y += 0.06

  icoMesh3.scale.setScalar(Math.cos((t * 0.001) - 1.0))
  icoMesh3.rotation.y += 0.06
  requestAnimationFrame(animate);
  // controls.update()
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

animate();
