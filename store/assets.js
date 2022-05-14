import { defineStore } from 'pinia'

import { createThumbnail } from '/three/thumbnailer'
import { gltfArrayBufferToScene } from '../three/import_export.js'


const assetStore = defineStore('assets', {
  state: () => ({
    assets: []
  }),

  actions: {
    async importGLTF({ name, from, buffer}) {
      const scene = await gltfArrayBufferToScene(buffer)
      const thumbnail = createThumbnail(scene)
      this.addAsset({ name, from, buffer, thumbnail })
    },

    addAsset({ name, from, buffer, thumbnail }) {
      this.assets.push({ name, from, buffer, thumbnail })
    }
  }
})

export default assetStore
