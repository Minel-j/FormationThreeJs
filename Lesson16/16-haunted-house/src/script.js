import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { roughness } from 'three/tsl'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * House
 */
const textureLoader = new THREE.TextureLoader()
const texturedoor = textureLoader.load('/textures/door/color.jpg')
texturedoor.colorSpace = THREE.SRGBColorSpace


const planeFieldGeometry = new THREE.PlaneGeometry(30,30)
const planeFieldMaterial = new THREE.MeshStandardMaterial({ color: 0x663333})
const planeField = new THREE.Mesh(planeFieldGeometry, planeFieldMaterial)
planeField.rotation.x = Math.PI *-0.5
planeFieldMaterial.roughness = 0
scene.add(planeField)
planeField.receiveShadow = true

const boxMaisonGeometry = new THREE.BoxGeometry(2, 2, 2)
const materialMaison = new THREE.MeshStandardMaterial({map: texturedoor})
const murMaison = new THREE.Mesh(boxMaisonGeometry, materialMaison)
scene.add(murMaison)
murMaison.position.y = 1.01
murMaison.castShadow = true

// const planeMaisonGeometry = new THREE.PlaneGeometry(3 ,3)
// const planeMaisonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000})
// const planeMaison = new THREE.Mesh(planeMaisonGeometry, planeMaisonMaterial)
// planeMaison.rotation.x = Math.PI *-0.5
// planeMaison.position.y = 2
// scene.add(planeMaison)

const coneToitGeometry = new THREE.ConeGeometry(2, 1, 4)
const coneToitMaterial = new THREE.MeshStandardMaterial
const coneToit = new THREE.Mesh(coneToitGeometry, coneToitMaterial)
scene.add(coneToit)
coneToit.position.y = 2.5
coneToit.rotation.y = 0.8
coneToit.castShadow = true

gui.add(coneToit.rotation, 'x').min(0).max(Math.PI *2).step(0.1)
gui.add(coneToit.rotation, 'y').min(0).max(Math.PI *2).step(0.1)
gui.add(coneToit.rotation, 'z').min(0).max(Math.PI *2).step(0.1)
gui.add(planeFieldMaterial, 'roughness').min(0).max(1).step(0.01)
gui.add(planeFieldMaterial, 'metalness').min(0).max(1).step(0.01)
// Temporary sphere


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 5)
directionalLight.position.set(3, 2, 8)
scene.add(directionalLight)
directionalLight.castShadow = true

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 9)
// scene.add(hemisphereLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.shadowMap.enabled = true

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()