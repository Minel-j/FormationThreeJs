import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'



/**
 * Debug
 */

const gui = new GUI({
    width:600,
    title:'Nice debug UI',
    closeFolders:true
})
//Ferme le gui
gui.close()
//cache le gui
gui.hide()
//Crée un event pour afficher ou cacher le gui
window.addEventListener('keydown', (event)=>{
    if (event.key == 'h') {
        gui.show(gui._hidden)
    }
})


//Utilisé pour creer des objets qui serviront au debug
const debugObject = {}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// Couleur utilisée pour le debug que three utilisera a sont tour
debugObject.color = '#e60000'
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)
//Attribution de la couleur de debug au material
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const cubeTweaks = gui.addFolder('Awesome cube')
//Utile pour fermer le dossier par defaut
//cubeTweaks.close()

cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

cubeTweaks
    .add(mesh, 'visible')

cubeTweaks
    .add(mesh.scale, 'x')
    .min(0.1)
    .max(3)
    .step(0.01)
    .name('elevation')

cubeTweaks
    .add(material, 'wireframe')

cubeTweaks
    .addColor(debugObject, 'color')
    //Utilisé pour afficher le code de la couleur des qu'elle va cnahger dans le gui
    .onChange(() => {
        console.log(debugObject.color);
        material.color.set(debugObject.color)
    })

debugObject.spiny = () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 })
}
cubeTweaks
    .add(debugObject, 'spiny')
    .name('Rotation Y')

debugObject.spinx = () => {
    gsap.to(mesh.rotation, { x: mesh.rotation.x + Math.PI * 2 })
}
cubeTweaks
    .add(debugObject, 'spinx')
    .name('Rotation X')

debugObject.spinz = () => {
    gsap.to(mesh.rotation, { z: mesh.rotation.z + Math.PI * 2 })
}

cubeTweaks
    .add(debugObject, 'spinz')
    .name('Rotation Z')

debugObject.subdivision = 2

cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        //Libere l'objet de la memoire
        mesh.geometry.dispose()
        //Remplace la geometry du mesh par la nouvelle
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            //Utilisation du parametre déclaré précédement
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()