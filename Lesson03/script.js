//Import de Three.js sous alias three.
import * as THREE from 'three'

//Canvas ciblé sur de canvas class webgl de l'html pour eviter les erreurs.
const canvas = document.querySelector('canvas.webgl')

//Scene, création d'une nouvelle scene
const scene = new THREE.Scene()

//Geometry, création d'une nouvelle geometry pour afficher un cube de dimentsion 1 avec la couleur rouge (juste pour l'exemple).
//cube de 1 de cote
const geometry = new THREE.BoxGeometry(1, 1, 1)
//création du matérial du cube, dans ce cas, juste une couleur rouge.
const material = new THREE.MeshBasicMaterial({ color: 'red' })
//Affectation au mesh de la geometry et du matérial pour le rendu.
const mesh = new THREE.Mesh(geometry, material)
//Ajout du mesh a la scene
scene.add(mesh)

//Sizes, définition des variables de tailles pour l'exemple pour etre réutilisés.
const sizes = {
    width: 800,
    height: 600,
}


//Camera, création de la caméra pour voir  notre scene
// Utilisation de la perspective camera avec un FOV de 75 ainsi que taille et dimension prédéfinie dans la variable.
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
//Postion de la camera, reculée de 3 pour voir l'objet, par defaut tout les objets sont a 0 donc on ne voit rien car tout est supperposé.
camera.position.z = 3
//Ajout de la caméra à la scene.
scene.add(camera)

//Rendrer pour générer le rendu dans le canvas de ce que l'on veut afficher.
//Création du rendu cilblé sur le canva
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
//Définition des tailles de rendu en fonction de la variable sizes.
renderer.setSize(sizes.width, sizes.height)

//Ajout de la scene et de la camera au rendu.
renderer.render(scene, camera)