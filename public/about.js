import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// canvas
const canvas = document.getElementById("canvas")

// sizes
const sizes = {
  width: innerWidth,
  height: innerHeight
}

// vertex shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// fragment shader
const fragmentShader = `
uniform sampler2D bgTexture;
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float wave1 = sin((1.0 - uv.x) * 10.0 + uTime * 4.5) * 0.5 + 0.5;
  float wave2 = sin((1.0 - (uv.x + 0.5)) * 10.0 + uTime * 3.5) * 1.0 + 1.0;

  float brightness = (wave1 + wave2) / 1.5 * 0.5;

  vec4 color = texture2D(bgTexture, vUv);

  vec3 glow = color.rgb * (1.0 + brightness);

  gl_FragColor = vec4(glow, color.a);
}
`

// scene
const scene = new THREE.Scene()

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 31

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);

// controls
// const controls = new OrbitControls(camera, renderer.domElement)

// texture
const bgTexture = new THREE.TextureLoader().load('./assets/textures/Home.png')

// geo
const planeGeo = new THREE.PlaneGeometry(120, 80, 100, 100)
const {array} = planeGeo.attributes.position;
planeGeo.setAttribute("originalPosition", new THREE.Float32BufferAttribute(array, 3));

// mat
const planeMat = new THREE.ShaderMaterial({
  uniforms: {
    bgTexture: {
      value: bgTexture,
    },
    uTime: {
      value: 0.0,
    }
  },
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide
})

// mesh
const planeMesh = new THREE.Mesh(planeGeo, planeMat)
scene.add(planeMesh);

// animate
const animate = (elapsedTime) => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
  planeMat.uniforms.uTime.value = elapsedTime * 0.0005
  const {array} = planeMesh.geometry.attributes.position;
  const originalPosition = planeMesh.geometry.attributes.originalPosition.array;
  const frequency = 0.002
  const amplitude = 3
  for(let i = 0; i < array.length; i += 3) {
    array[i + 2] = originalPosition[i + 2] + Math.sin(frequency * elapsedTime + array[i] * 0.04) * amplitude
  }
  planeMesh.geometry.attributes.position.needsUpdate = true;
}

animate()

addEventListener("resize", () => {
  sizes.width = innerWidth;
  sizes.height = innerHeight;
  renderer.setSize(sizes.width, sizes.height)
  camera.updateProjectionMatrix()
})