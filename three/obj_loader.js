
// const onProgress = (data) => {
//     console.log("onProgress", data);
// };
//
// const onError = (error) => {
//     console.error("onError", error);
// };
//
// let materialLoader = new MTLLoader();
// let objectLoader = new OBJLoader();
// materialLoader.load('/models/tile_001.mtl', (materials) => {
//     materials.preload();
//     objectLoader.setMaterials(materials);
//     objectLoader.load('/models/tile_001.obj', (object) => {
//         object.position.y = 1;
//         scene.add(object);
//     }, onProgress, onError);
// }, onProgress, onError);
