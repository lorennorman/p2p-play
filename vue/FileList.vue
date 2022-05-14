<template>
  <div id="left-panel">
    <button v-if="mode == 'assets'" @click="mode = 'files'">Files</button>
    <button v-if="mode == 'files'" @click="mode = 'assets'">Assets</button>

    <div v-if="mode == 'files'">
      <header>Files ({{ files.length }})</header>
      <hr/>
      <ul>
        <li v-for="file in files">
          {{ file.status[0] }} {{ file.scene ? 'S' : '-' }}
          <button @click="removeFile(file)">X</button>
          {{ file.name }} {{ Math.ceil(file.size/1000) }}kb
        </li>
      </ul>
    </div>

    <div v-if="mode == 'assets'">
      <header>Assets ({{ assets.length }})</header>
      <hr/>
      <ul>
        <li v-for="asset in assets" @click="putAssetOnStage(asset)">
          <figure>
            <img :src="asset.thumbnail.src" />
            <figcaption>{{ asset.name }}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import * as zip from "@zip.js/zip.js";

  import useFileStore from '/store/files.js'
  import useAssetStore from '/store/assets.js'

  import { gltfArrayBufferToScene } from '../three/import_export.js'
  import { stage } from '../three/stage.js'

  export default {
    data: () => ({
      mode: 'assets'
    }),

    computed: {
      ...mapState(useFileStore, ['files']),
      ...mapState(useAssetStore, ['assets'])
    },

    methods: {
      ...mapActions(useFileStore, ['addFile', 'removeFile']),

      async putAssetOnStage(asset) {
        stage.clear()
        const assetScene = await gltfArrayBufferToScene(asset.buffer)
        stage.add(assetScene)
      }
    }
  }
</script>

<style>
  #left-panel {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 25%;
    padding: 16px;
    background-color: #336699;
    overflow-x: hidden;
    opacity: 0.9;
    max-height: 90%;
  }

  button {
    margin-bottom: 10px;
  }

  #left-panel header {
    font-size: 1.66em;
    font-weight: bold;
  }

  #left-panel ul { padding-left: 0; }
  #left-panel li {
    list-style: none;
    margin-bottom: 2px;
  }
  #left-panel li:hover {
      background-color: #235689
  }
  #left-panel button {
    margin-right: 5px;
    cursor: pointer;
  }

  #asset-list li {
    display: inline-block;
  }

  figure {
    margin: 0;
    display: inline-block;
  }
</style>
