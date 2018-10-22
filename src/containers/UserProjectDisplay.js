import React from 'react'
import {connect} from 'react-redux'
import {FIND_USER_PROJECTS} from '../reducers/types'
import {ActionCable} from 'react-actioncable-provider'

class UserProjectDisplay extends React.Component{
  componentDidMount(){
    fetch(`http://localhost:4000/users/${this.props.currentUser.id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: 'GET',
    })
    .then(res => res.json())
    .then(user => this.props.findUserProjects(user))
  }


  render(){
    return(
      <>
      <ActionCable channel={{channel: 'ProjectChannel'}} onReceived={(data) => this.props.findImageUrl(data)}/>
        {this.props.currentUser.projects && this.props.currentUser.projects.map(proj =>(
       <div key={proj.id}>
         <div> {proj.title}</div>
         <div>{proj.image_url ? <img src={proj.image_url} alt='skrs'/> : null }</div>
         <div>{proj.story}</div>
       </div>
     ))}
      </>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps =(dispatch) =>{
  return {
    findUserProjects: (data) => dispatch({type:FIND_USER_PROJECTS , payload: data }),
    findImageUrl: (data) => dispatch({type:"UPDATE_IMAGE_URL", payload:data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectDisplay)
