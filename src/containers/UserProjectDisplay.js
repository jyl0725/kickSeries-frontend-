import React from 'react'
import {connect} from 'react-redux'
import {FIND_USER_PROJECTS} from '../reducers/types'

class UserProjectDisplay extends React.Component{
  componentDidMount(){
    fetch(`http://localhost:4000/users/${this.props.currentUser.id}`)
    .then(res => res.json())
    .then(user => this.props.findUserProjects(user))
  }

  render(){
    console.log(this.props.currentUser)
    return(
      <>
        {this.props.currentUser.projects && this.props.currentUser.projects.map(proj =>(
         <div key={proj.id}>
           <div > {proj.title}</div>
           <div >{proj.image_url}</div>
           <div >{proj.story}</div>
         </div>
      ))}
      </>
    )
  }
}

const mapStatetoProps = (state) =>{
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchtoProps =(dispatch) =>{
  return {
    findUserProjects: (data) => dispatch({type:FIND_USER_PROJECTS , payload: data })
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UserProjectDisplay)
