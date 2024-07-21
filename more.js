import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

// canvas
const canvas = document.getElementById("WebGl2");

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
camera.position.z = 10;

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)

// controls
// const controls = new OrbitControls(camera, renderer.domElement);


// plane geo
const planeGeo = new THREE.PlaneGeometry(40, 40, 28, 28);

// plane mat
const planeMat = new THREE.MeshStandardMaterial({
  flatShading: true,
  side: THREE.DoubleSide,
  vertexColors: true,
});

// planeMesh
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
scene.add(planeMesh);

const { array } = planeMesh.geometry.attributes.position;


// original position
planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array

// randomValues
let randomValues = []

for (let i = 0; i < array.length; i++) {
 if(i % 3 === 0) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2];
  array[i] = x + (Math.random() - 0.5)
  array[i + 1] = y + (Math.random() - 0.5)
  array[i + 2] = z + Math.random();
 }
 randomValues.push(Math.random() - 0.5)
}

// randomValues Attribute
planeMesh.geometry.attributes.position.randomValues = randomValues

// raycaster
const raycaster = new THREE.Raycaster();

// lights
const forwardLight = new THREE.DirectionalLight(0xffffff);
const backLight = new THREE.DirectionalLight(0xffffff);
forwardLight.position.set(0, 0, 1);
backLight.position.set(0, 0, -1);
scene.add(forwardLight, backLight);

// normalized cords
const mouseCords = {
  x: undefined,
  y: undefined,
};


// colors in rgb for each vertice x,y,z
const colors = [];
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
  colors.push(0, 0.19, 0.4);
}


// set color attribute
planeMesh.geometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(new Float32Array(colors), 3)
);

// frames
let frames = 0

// animate
function animate() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  raycaster.setFromCamera(mouseCords, camera);
  const intersects = raycaster.intersectObject(planeMesh);
  frames += 0.01

  const { randomValues, array, originalPosition } = planeMesh.geometry.attributes.position

  for(let i = 0; i < array.length; i += 3) {
    //x
    array[i] = originalPosition[i] + Math.cos(frames + randomValues[i]) * 0.007

    // y
    array[i + 1] = originalPosition[i + 1] + Math.sin(frames + randomValues[i + 1]) * 0.007
  }

  planeMesh.geometry.attributes.position.needsUpdate = true

  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes;

    // vertice 1
    color.setX(intersects[0].face.a, 0.1);
    color.setY(intersects[0].face.a, 0.5);
    color.setZ(intersects[0].face.a, 1);

    // vertice 2
    color.setX(intersects[0].face.b, 0.1);
    color.setY(intersects[0].face.b, 0.5);
    color.setZ(intersects[0].face.b, 1);

    // vertice 3
    color.setX(intersects[0].face.c, 0.1);
    color.setY(intersects[0].face.c, 0.5);
    color.setZ(intersects[0].face.c, 1);

    //update
    color.needsUpdate = true;

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4,
    };

    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1,
    };

    // revert color back to inital state
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1,
      onUpdate: () => {
        // vertice 1
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);

        // vertice 2
        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);

        // vertice 3
        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);
      },
    });
  }

//   controls.update();
}

animate();

// resize update
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

addEventListener("mousemove", (event) => {
  mouseCords.x = (event.clientX / innerWidth) * 2 - 1;
  mouseCords.y = -(event.clientY / innerHeight) * 2 + 1;
});
