import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class UncompletedProjectsContainer extends React.Component{

  state ={
    redirect: false
  }

  redirectStoryTeller(){
    if(this.props.currentUser.role === 'story teller'){
      return <Redirect to ='/newprojectform' />
    }
  }

  renderArtist(){
    if(this.props.currentUser.role === 'artist'){
      return this.props.projects.filter(project =>{
        project.users.length === 1
      }).map(pro =>{
        return <div onClick{this.handleClick} key={pro.id}>{pro.title}</div>
      })
    }
  }



  render(){
    return(
      <div>
        {this.redirectStoryTeller()}
      </div>
    )
  }
}

const mapStatetoProps = state =>{
  return{
    currentUser :state.user.currentUser,
    projects: state.project.projects
  }

}

const mapDispatchtoProps = state =>{
  return{

  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UncompletedProjectsContainer)
