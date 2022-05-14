import * as zip from "@zip.js/zip.js";
import { defineStore } from 'pinia'

import useAssetStore from './assets.js'

const fileStore = defineStore('files', {
  state: () => ({
    files: []
  }),

  actions: {
    updateFile(file) {
      const index = this.files.indexOf(file)
      this.files.splice(index, 1)
      this.files.splice(index, 0, file)
    },

    addFile(file) {
      file.status = "unprocessed"
      this.files.push(file)
      setTimeout(() => this.processFile(file), 0)
    },

    removeFile(file) {
      const index = this.files.indexOf(file)
      if(index < 0) { throw new Error(`File not found: ${file.name}`) }
      this.files.splice(index, 1)
    },

    async processFile(file) {
      // unzip zips
      if(file.type === "application/zip") {
        const
          reader = new zip.ZipReader(new zip.BlobReader(file)),
          entries = await reader.getEntries()

        entries.forEach(async entry => {
          if(!entry.filename.endsWith(".glb") || entry.filename.startsWith("__")) { return }

          const fileByteArray = await entry.getData(new zip.Uint8ArrayWriter())

          this.addFile(new File([fileByteArray.buffer], entry.filename, { type: "model/gltf-binary" }))
        })

      // parse gltfs
      } else if(file.name.endsWith(".glb")) {
        useAssetStore().importGLTF({
          name: file.name,
          from: file.name,
          buffer: await file.arrayBuffer()
        })
      }

      file.status = "processed"

      this.updateFile(file)
    }
  }
})

export default fileStore
