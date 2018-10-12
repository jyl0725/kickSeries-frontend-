import React from 'react'
import {connect} from 'react-redux'


const SingleCompletedProjectDisplay = (props) =>{
  const renderProjectUsers = () =>{
    return props.project.users.map(user => {
      return (<div> User: {user.name} Role: {user.role}</div>)
    })
  }
  return(
    <div>
      {props.project.title}
      <img src={props.project.image_url} width="200" height="200" />
      {props.project.story}
      {renderProjectUsers()}
    </div>
  )
}

const mapStatetoProps = (state) =>{
  return {
    project: state.project.project,
  }
}


export default connect(mapStatetoProps)(SingleCompletedProjectDisplay)
