// Builds itself into the entire background of the body
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight), 0.1, 1000 )
camera.position.set(5, 5, 5)
camera.rotation.set(45, 15, 0)
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.8;
scene.add(ambientLight);
const spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set( 100, 2000, 100 )
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 256
spotLight.shadow.mapSize.height = 256
spotLight.shadow.camera.near = 500
spotLight.shadow.camera.far = 4000
spotLight.shadow.camera.fov = 30
scene.add(spotLight)
const renderer = new THREE.WebGLRenderer()
const resize = () => renderer.setSize(window.innerWidth, window.innerHeight)
window.onresize = resize
resize()
const controls = new OrbitControls(camera, renderer.domElement)
const gridHelper = new THREE.GridHelper()
scene.add( gridHelper )
const axesHelper = new THREE.AxesHelper()
scene.add( axesHelper )

const stage = new THREE.Group()
scene.add(stage)

const animate = () => {
	requestAnimationFrame( animate )
	// required if controls.enableDamping or controls.autoRotate are set to true
	// controls.update()
	renderer.render( scene, camera )
}
animate()

export { renderer, stage }

document.body.appendChild(renderer.domElement)
