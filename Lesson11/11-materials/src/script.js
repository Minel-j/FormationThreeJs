import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { property } from 'three/tsl'


/**
 * Debug
 */

const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load("./textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg")
const matcapsTexture = textureLoader.load("./textures/matcaps/8.png")
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg")
const donutTexture = textureLoader.load("./textures/donutTexture.png")
doorColorTexture.colorSpace = THREE.SRGBColorSpace
donutTexture.colorSpace = THREE.SRGBColorSpace
matcapsTexture.colorSpace = THREE.SRGBColorSpace


/**
 * Objects
 */
//Mesh basic materials
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('red')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.FrontSide

//MeshNormalMaterial
//const material = new THREE.MeshNormalMaterial()


//MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapsTexture

//MeshDepthMaterial
//const material = new THREE.MeshDepthMaterial()

//MeshLambertMaterial
//const material = new THREE.MeshLambertMaterial()

//MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

//MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity=1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.091
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

//MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.091
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'displacementScale').min(0).max(1).step(0.000001)

//Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)

//Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')

//Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange,'0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange,'1').min(1).max(1000).step(1)

//Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(0).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)



const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 2, 2),
    material
)
cube.position.y = 1.5

scene.add(sphere, plane, torus, cube)


var sphereRotationY = 0.1
var planeRotationY = -0.1
var cubeRotationY = 0.1
var torusRotationY = 0.1
var sphereRotationX = -0.2
var planeRotationX = 0.2
var cubeRotationX = -0.2
var torusRotationX = -0.2



/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)



/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = sphereRotationY * elapsedTime
    // plane.rotation.y = planeRotationY * elapsedTime
    // torus.rotation.y = torusRotationY * elapsedTime
    // cube.rotation.y = cubeRotationY * elapsedTime

    // sphere.rotation.x = sphereRotationX * elapsedTime
    // plane.rotation.x = planeRotationX * elapsedTime
    // torus.rotation.x = torusRotationX * elapsedTime
    // cube.rotation.x = cubeRotationX * elapsedTime




    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()