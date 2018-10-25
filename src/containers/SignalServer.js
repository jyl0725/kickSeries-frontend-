import React from 'react'

class SignalServer extends React.Component{
  render(){
    return(
      <div>
        <div id="remote-video-container"></div>
        <video id="local-video" autoplay></video>
      </div>


    )
  }
}

export default SignalServer
