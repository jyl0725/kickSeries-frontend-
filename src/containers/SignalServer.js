import React from 'react'
import {Button} from 'semantic-ui-react'

class SignalServer extends React.Component{
  //
  // const JOIN_ROOM = "JOIN_ROOM";
  // const EXCHANGE = "EXCHANGE";
  // const REMOVE_USER = "REMOVE_USER";

  state ={
    src: null
  }


  handleStart = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => this.setState({src: window.URL.createObjectURL(stream) }))

  }

  handleEnd = () =>{
    console.log(navigator.mediaDevices)
  }

  // DOM Elements
  // let currentUser;
  // let localVideo;
  // let remoteVideoContainer;
  //
  // // Objects
  // let pcPeers = {};
  //
  // window.onload = () => {
  //   currentUser = document.getElementById("current-user").innerHTML;
  //   localVideo = document.getElementById("local-video");
  //   remoteVideoContainer = document.getElementById("remote-video-container");
  // };

  // Ice Credentials

  render(){

    const ice = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }]};


    // // Objects
    // let pcPeers = {};
    // localstream;
    //

      // App.session = await App.cable.subscriptions.create("SessionChannel", {
      //   connected: () => {
      //     broadcastData({
      //       type: JOIN_ROOM,
      //       from: currentUser
      //     });

    //     received: data => {
    //       console.log("received", data);
    //       if (data.from === currentUser) return;
    //       switch (data.type) {
    //         case JOIN_ROOM:
    //           return joinRoom(data);
    //         case EXCHANGE:
    //           if (data.to !== currentUser) return;
    //           return exchange(data);
    //         case REMOVE_USER:
    //           return removeUser(data);
    //         default:
    //           return;
    //       }
    //     }
    //   });
    // };
    //
    // const handleLeaveSession = () => {
    //   for (user in pcPeers) {
    //     pcPeers[user].close();
    //   }
    //   pcPeers = {};
    //
    //   App.session.unsubscribe();
    //
    //   remoteVideoContainer.innerHTML = "";
    //
    //   broadcastData({
    //     type: REMOVE_USER,
    //     from: currentUser
    //   });
    // };
    //
    // const joinRoom = data => {
    //   createPC(data.from, true);
    // };
    //
    // const removeUser = data => {
    //   console.log("removing user", data.from);
    //   let video = document.getElementById(`remoteVideoContainer+${data.from}`);
    //   video && video.remove();
    //   delete pcPeers[data.from];
    // };
    //
    // const createPC = (userId, isOffer) => {
    //   let pc = new RTCPeerConnection(ice);
    //   pcPeers[userId] = pc;
    //   pc.addStream(localstream);
    //
    //   isOffer &&
    //     pc
    //       .createOffer()
    //       .then(offer => {
    //         pc.setLocalDescription(offer);
    //         broadcastData({
    //           type: EXCHANGE,
    //           from: currentUser,
    //           to: userId,
    //           sdp: JSON.stringify(pc.localDescription)
    //         });
    //       })
    //       .catch(logError);
    //
    //   pc.onicecandidate = event => {
    //     event.candidate &&
    //       broadcastData({
    //         type: EXCHANGE,
    //         from: currentUser,
    //         to: userId,
    //         candidate: JSON.stringify(event.candidate)
    //       });
    //   };
    //
    //   pc.onaddstream = event => {
    //     const element = document.createElement("video");
    //     element.id = `remoteVideoContainer+${userId}`;
    //     element.autoplay = "autoplay";
    //     element.srcObject = event.stream;
    //     remoteVideoContainer.appendChild(element);
    //   };
    //
    //   pc.oniceconnectionstatechange = event => {
    //     if (pc.iceConnectionState == "disconnected") {
    //       console.log("Disconnected:", userId);
    //       broadcastData({
    //         type: REMOVE_USER,
    //         from: userId
    //       });
    //     }
    //   };
    //
    //   return pc;
    // };
    //
    // const exchange = data => {
    //   let pc;
    //
    //   if (!pcPeers[data.from]) {
    //     pc = createPC(data.from, false);
    //   } else {
    //     pc = pcPeers[data.from];
    //   }
    //
    //   if (data.candidate) {
    //     pc
    //       .addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
    //       .then(() => console.log("Ice candidate added"))
    //       .catch(logError);
    //   }
    //
    //   if (data.sdp) {
    //     sdp = JSON.parse(data.sdp);
    //     pc
    //       .setRemoteDescription(new RTCSessionDescription(sdp))
    //       .then(() => {
    //         if (sdp.type === "offer") {
    //           pc.createAnswer().then(answer => {
    //             pc.setLocalDescription(answer);
    //             broadcastData({
    //               type: EXCHANGE,
    //               from: currentUser,
    //               to: data.from,
    //               sdp: JSON.stringify(pc.localDescription)
    //             });
    //           });
    //         }
    //       })
    //       .catch(logError);
    //   }
    // };
    //
    // const broadcastData = data => {
    //   fetch("sessions", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: { "content-type": "application/json" }
    //   });
    // };
    //
    // const logError = error => console.warn("Whoops! Error:", error);

    return(
      <div id='videos-container'>
        <div id="remote-video-container"></div>
        <video id="local-video" autoPlay src={this.state.src} ></video>
          <button onClick={this.handleStart} >
              Join Room
              </button>
      </div>


    )
  }
}

export default SignalServer
