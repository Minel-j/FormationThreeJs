import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

//Permet de définir x, y, et z 
// mesh.position.set(0.7, -0.6, 1)
// scene.add(mesh)

//Donne la distance de l'objet par rapport au centre de la scene.
// console.log(mesh.position.length());

//Réduit la distance du vecteur pour que la distance équivaut à 1, mesh.position.length() = 1.
// mesh.position.normalize();


//Axes helper, permet d'afficher mes axes x, y et z sur le renderer. Mettre un chiffre entre parenthese, permet de modifier la longueur des traits.
// const axesHelper = new THREE.AxesHelper()
//Ajoute l'axesHelper à la scene
// scene.add(axesHelper)

//Scale, permet de modifier le scale en fonction d'un axe x, y et z.
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5
//Possibilité de modifier toutes les valeurs en meme temps
// mesh.scale.set(2, 0.25, 0.5)

//Rotation, permet de définir sur quel axe, l'objet devra tourner, une demi rotation se fait avec environ 3.14 (PI)

//Permet de définir l'ordre dans lequel on va effectuer les rotations. Toujours en premier.
// mesh.rotation.reorder('YXZ')

//mesh.rotation.y = 3.14
//Peut s'ecrire comme cela
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI * 0.25


//Création des Group, permets de grouper des objets pour les transformer ensemble
const group = new THREE.Group()
//Modifie la position du groupe de 1 sur y
group.position.y = 1
//Modifie le scale du groupe de 1 sur y
group.scale.y = 2
//Modifie la rotation du groupe de 1 sur y
group.rotation.y = 1
//Ajout du cube à la scene.
scene.add(group)

//Permet de creer un cube avec sa geometry et son material, mais d'une autre maniere.
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
//Ajout du cube au group
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'blue'})
)
cube2.position.x = -2
//Ajout du cube au group
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
cube3.position.x = 2
//Ajout du cube au group
group.add(cube3)





/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//LookAt, permet de regarder quelque chose.
//Regarde actuellement l'objet mesh en utilisant la postion du mesh qui est un vecteur3
//camera.lookAt(mesh.position)

//Donne la distance entre l'objet et la camera.
//console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)