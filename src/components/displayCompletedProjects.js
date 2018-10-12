import React from 'react'
import {connect} from 'react-redux'


const DisplayCompletedProjects = (props) =>{
  console.log(props)
  return(
    <div id='snkr-card-container'>
      <img src={props.image_url} alt='sneaker-pic' width ='200' height='200' />
       <div>
      {props.title}
       </div>
    </div>
  )
}

export default DisplayCompletedProjects
