import './style.css'

import './vue_app.js'
import useFileStore from './store/files.js'


import { acceptDroppedFiles } from '/util/drag_n_dropper'

const { addFile } = useFileStore()

acceptDroppedFiles(document.body, {
  "application/zip": addFile,
  ".glb": addFile
})
