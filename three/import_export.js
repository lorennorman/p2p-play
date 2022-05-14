import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const exporter = new GLTFExporter()
const loader = new GLTFLoader()

const gltfPathToScene = async gltfPath => {
  return new Promise((resolve, reject) => {
    loader.load(
      // resource URL
      gltfPath,
      // called when the resource is loaded
      gltf => resolve(gltf.scene)
    )
  })
}

const gltfArrayBufferToScene = async gltfJson => {
  return new Promise((resolve, reject) => {
    loader.parse(
      // resource URL
      gltfJson, '',
      // called when the resource is loaded
      gltf => resolve(gltf.scene),
      reject
    )
  })
}


export {
  gltfPathToScene,
  gltfArrayBufferToScene
}
