import './style.css'

import { joinRoom } from 'trystero'

const config = { appId: 'p2p-playroom' }
const room = joinRoom(config, 'lorens_room')

const messages = document.getElementById("app")

room.onPeerJoin(peerId => {
  const newLine = document.createElement("p")
  newLine.innerHTML = `${peerId} joined`
  messages.appendChild(newLine)
})

room.onPeerLeave(peerId => {
  const newLine = document.createElement("p")
  newLine.innerHTML = `${peerId} left`
  messages.appendChild(newLine)
})
