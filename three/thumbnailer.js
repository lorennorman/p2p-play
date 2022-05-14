import * as THREE from 'three'
// Build a nice scene
const portraitScene = new THREE.Scene()
const portraitCamera = new THREE.PerspectiveCamera( 50, 1, 0.1, 1000 )
portraitCamera.position.set(1, 1.2, 1)
// const portraitCameraEuler = new THREE.Euler( .4, .4, 0, 'YXZ' );
// portraitCamera.rotation.applyEuler(portraitCameraEuler)
portraitCamera.rotateOnAxis(new THREE.Vector3(0, 1, 0), .8)
portraitCamera.rotateOnAxis(new THREE.Vector3(1, 0, 0), -.6)
const portraitLight = new THREE.AmbientLight(0xffffff);
portraitLight.intensity = 0.8;
portraitScene.add(portraitLight);
const spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set( 100, 2000, 100 )
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 256
spotLight.shadow.mapSize.height = 256
spotLight.shadow.camera.near = 500
spotLight.shadow.camera.far = 4000
spotLight.shadow.camera.fov = 30
portraitScene.add(spotLight)

// const portraitGridHelper = new THREE.GridHelper()
// portraitScene.add( portraitGridHelper )
const portraitRenderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, antialias: true })

const createThumbnail = sceneToRender => {
  portraitRenderer.setSize(100, 100)
  // Place the subject
  portraitScene.add(sceneToRender)
  // Take the portrait
  portraitRenderer.render(portraitScene, portraitCamera)
  // Remove the subject
  portraitScene.remove(sceneToRender)
  // Develop the film jkjk
  var image = new Image()
  image.src = portraitRenderer.domElement.toDataURL()

  return image
}

export { createThumbnail }
