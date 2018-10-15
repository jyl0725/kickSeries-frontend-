import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FIND_PROJECT} from '../reducers/types'

class UncompletedProjectsContainer extends React.Component{

  state ={
    redirect: false
  }

  handleClick =(event) =>{
    console.log(this.props.projects)
    const project = this.props.projects.find(p => p.title === event.target.innerText)
    this.props.findProject(project)
    this.setState({
      redirect:true
    })
  }

  redirectStoryTeller(){
    if(this.props.currentUser.role === 'story teller'){
      return <Redirect to ='/newprojectform' />
    }
  }

  renderArtist(){
    if(this.props.currentUser.role === 'artist'){
      return this.props.projects.filter(project =>{
        return project.users.length === 1
      }).map(pro =>{
        return <div onClick={this.handleClick} key={pro.id}>{pro.title}</div>
      })
    }
  }

  redirectArtist(){
    if(this.state.redirect){
      return <Redirect to='/singlearistproject' />
    }
  }



  render(){
    return(
      <div>
        {this.redirectStoryTeller()}
        {this.renderArtist()}
        {this.redirectArtist()}
      </div>
    )
  }
}

const mapStatetoProps = state =>{
  return{
    currentUser: state.user.currentUser,
    projects: state.project.projects,
  }

}

const mapDispatchtoProps = dispatch =>{
  return{
    findProject: (project) => dispatch({type: FIND_PROJECT, payload: project})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UncompletedProjectsContainer)
