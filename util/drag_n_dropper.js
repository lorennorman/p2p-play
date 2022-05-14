const droppedFiles = async ev => {
  ev.preventDefault() // No, browser!

  const
    { items, files } = ev.dataTransfer,
    droppedFiles = []

  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') { droppedFiles.push(items[i].getAsFile()) }
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      droppedFiles.push(files[i])
    }
  }

  return droppedFiles
}

// Stop browser default File -> Open behavior
const ondragover = ev => ev.preventDefault()

const acceptDroppedFiles = (dropElement, parseMimeTypes={}) => {
  dropElement.ondrop = async (ev) => {
    const files = await droppedFiles(ev)

    // for each file...
    files.forEach( file => {
      // for each parse rule...
      for (const [matcher, parseFunc] of Object.entries(parseMimeTypes)) {
        // rule is a file extension
        if(matcher.startsWith('.')) {
          if(file.name.endsWith(matcher)) {
            parseFunc(file)
            break
          }
        } else {
          if(file.type === matcher) {
            parseFunc(file)
            break
          }
        }
      }
    })
  }

  dropElement.ondragover = ondragover
}

export { acceptDroppedFiles }
