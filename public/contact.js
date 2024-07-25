import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// canvas
const canvas = document.getElementById("WebGl");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// mouseCords
const mouseCords = {
  x: undefined,
  y: undefined,
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
camera.position.z = 2;

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xffffff);

// controls
// const controls = new OrbitControls(camera, renderer.domElement)

// particlesGeo
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 15000;
const positionArray = new Float32Array(particlesCount * 3);
const originalPosition = new Float32Array(particlesCount * 3);

let gridWidth = 150;
let gridHeight = 100;
let spacing = 0.05;
let index = 0;

for (let i = 0; i < gridHeight; i++) {
  for (let j = 0; j < gridWidth; j++) {
    if (index >= particlesCount * 3) break;
    positionArray[index] = j * spacing - (gridWidth * spacing) / 2;
    positionArray[index + 1] = i * spacing - (gridHeight * spacing) / 2;
    positionArray[index + 2] = 0;

    originalPosition[index] = j * spacing - (gridWidth * spacing) / 2;
    originalPosition[index + 1] = i * spacing - (gridHeight * spacing) / 2;
    originalPosition[index + 2] = 0;

    index += 3;
  }
}

particlesGeo.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);
particlesGeo.setAttribute(
  "originalPosition",
  new THREE.BufferAttribute(originalPosition, 3)
);

const particlesMat = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.01,
});

const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// animateParticles
const animateParticles = () => {
  const position = particlesMesh.geometry.attributes.position.array;
  const originalPositionsArr =
    particlesMesh.geometry.attributes.originalPosition.array;
  let force = 0.5;
  let radius = 0.50;
  let attractionStrength = 0.1;

  const mouseX = (mouseCords.x * (gridWidth * spacing)) / 2
  const mouseY = (mouseCords.y * (gridWidth * spacing)) / 2

  if (mouseCords.x !== undefined && mouseCords.y !== undefined) {
    for (let i = 0; i < position.length; i += 3) {
      const x = position[i];
      const y = position[i + 1];

      const dx = x - mouseX;
      const dy = y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      const angle = Math.atan2(dy, dx)

      if(distance < radius) {
        const forceX = force * (radius - distance) * Math.cos(angle)
        const forceY = force * (radius - distance) * Math.sin(angle)

        position[i] += forceX 
        position[i + 1] += forceY
      } else {
        position[i] += (originalPositionsArr[i] - x) * attractionStrength
        position[i + 1] += (originalPositionsArr[i + 1] - y) * attractionStrength
      }
    }
  }
  particlesMesh.geometry.attributes.position.needsUpdate = true;
};

// animate
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  animateParticles()
  // controls.update()
}

animate();

addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // rerender
  renderer.setSize(sizes.width, sizes.height);
  camera.updateProjectionMatrix();
});

addEventListener("mousemove", (e) => {
  mouseCords.x = (e.clientX / innerWidth) * 2 - 1;
  mouseCords.y = -(e.clientY / innerHeight) * 2 + 1;
});
