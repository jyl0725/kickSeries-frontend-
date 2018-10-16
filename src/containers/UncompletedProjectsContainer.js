import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FIND_PROJECT, SHOW_PROJECTS} from '../reducers/types'

class UncompletedProjectsContainer extends React.Component{

  state ={
    redirectArtist: false,
    redirectDesigner: false,
  }

  componentDidMount(){
    fetch('http://localhost:4000/projects/')
    .then(res => res.json())
    .then(projectData => this.props.showProjects(projectData))
  }

  handleClick =(event) =>{
    console.log(this.props.projects)
    const project = this.props.projects.find(p => p.title === event.target.innerText)
    this.props.findProject(project)
    if(this.props.currentUser.role === 'artist'){
      this.setState({redirectArtist :true})
    }else{
      this.setState({redirectDesigner: true})
    }
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

  renderDesigner(){
    if(this.props.currentUser.role === 'designer'){
      return this.props.projects.filter(project =>{
        return project.users.length === 2
          }).map(pro =>{
          return <div onClick={this.handleClick} key={pro.id}>{pro.title}</div>
      })
    }
  }

  redirectArtist(){
    if(this.state.redirectArtist){
      return <Redirect to='/singlearistproject' />
    }
  }

  redirectDesigner(){
    if(this.state.redirectDesigner){
      return <Redirect to='/singledesignerproject' />
    }
  }



  render(){
    return(
      <div>
        {this.redirectStoryTeller()}
        {this.renderArtist()}
        {this.redirectArtist()}
        {this.renderDesigner()}
        {this.redirectDesigner()}
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
    findProject: (project) => dispatch({type: FIND_PROJECT, payload: project}),
    showProjects: (projectData) => dispatch({type: SHOW_PROJECTS, payload: projectData})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UncompletedProjectsContainer)
