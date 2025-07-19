import React from 'react'
import { useParams } from 'react-router-dom'
function Chatpage() {
    const {sessionId}:string=useParams()
  return (
    <div>{sessionId}</div>
  )
}

export default Chatpage