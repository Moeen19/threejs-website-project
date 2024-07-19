import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

//canvas
const canvas = document.getElementById("WebGl")

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// scene
const scene = new THREE.Scene()

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 2.5

// renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)

// sunlight
const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)

// earthGroup
const earthGroup = new THREE.Group()
scene.add(earthGroup)

// textures
const earthTexture = new THREE.TextureLoader().load('./textures/2k_earth_daymap.jpg')
const lightsTexture = new THREE.TextureLoader().load('./textures/03_earthlights1k.jpg')
const cloudsTexture = new THREE.TextureLoader().load('./textures/05_earthcloudmaptrans.jpg')

// earth Geo
const earthGeo = new THREE.IcosahedronGeometry(1, 12)

// earth mat
const earthMat = new THREE.MeshStandardMaterial({
  map: earthTexture
})

// earth mesh
const earthMesh = new THREE.Mesh(earthGeo, earthMat)
earthGroup.rotation.z = -23.4 * Math.PI / 180
earthGroup.add(earthMesh)

// earthLights Mat
const earthLights = new THREE.MeshBasicMaterial({
  map: lightsTexture,
  blending: THREE.AdditiveBlending
})

// earthLights Mesh
const earthLightsMesh = new THREE.Mesh(earthGeo, earthLights)
earthGroup.add(earthLightsMesh)

// clouds Mat
const cloudsMat = new THREE.MeshStandardMaterial({
  map: cloudsTexture,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.7
})

// clouds Mesh
const cloudsMesh = new THREE.Mesh(earthGeo, cloudsMat)
cloudsMesh.scale.setScalar(1.008)
earthGroup.add(cloudsMesh)

// controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05

// getStars
function getStars() {
  const geo = new THREE.SphereGeometry(0.10, 24,24)
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const star = new THREE.Mesh(geo, mat)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}

Array(2000).fill().forEach(getStars)

// animate
function animate() {
  renderer.render(scene, camera)
  earthMesh.rotation.y += 0.002
  earthLightsMesh.rotation.y += 0.002
  cloudsMesh.rotation.y += 0.003
  controls.update()
  window.requestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

animate()