import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FIND_PROJECT, SHOW_PROJECTS} from '../reducers/types'
import ProjectAdapter from '../adapters/projectAdapter'
import ProjectUserAdapter from '../adapters/projectUserAdapter'
import {Card} from 'semantic-ui-react'
import exist from '../hocs/exist'

class UncompletedProjectsContainer extends React.Component{

  state ={
    redirectArtist: false,
    redirectDesigner: false,
  }

  componentDidMount(){
    ProjectAdapter.fetchAllProject()
    .then(projectData => this.props.showProjects(projectData))
  }

  handleClick =(event) =>{
    const project = this.props.projects.find(proj => proj.id === parseInt(event.target.parentNode.id) || proj.image_url === event.target.src || proj.title.split(' ').join('')  === event.target.innerText.split(' ').join('') || proj.story.split(' ').join('')  === event.target.innerText.split(' ').join(''))
    this.props.findProject(project)
    if(this.props.currentUser.role === 'artist'){
      this.setState({redirectArtist :true})
    }else{
      this.setState({redirectDesigner: true})
    }
    fetch(`http://localhost:4000/project_users`,{
       headers:{
       'Accept': 'application/json',
       'Content-Type': 'application/json'
        },
       method: 'POST',
       body: JSON.stringify({ project_id: project.id, user_id: this.props.currentUser.id })
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
        return <Card id={pro.id} onClick={this.handleClick} key={pro.id} header={pro.title} description={pro.story} />
      })
    }
  }

  renderDesigner(){
    if(this.props.currentUser.role === 'designer'){
      return this.props.projects.filter(project =>{
        return project.users.length === 2
          }).map(pro =>{
          return <Card id={pro.id} onClick={this.handleClick} key={pro.id} header={pro.title} description={pro.story} image={pro.image_url}/>
      })
    }
  }

  redirectArtist(){
    if(this.state.redirectArtist){
      return <Redirect to='/singleartistproject' />
    }
  }

  redirectDesigner(){
    if(this.state.redirectDesigner){
      return <Redirect to='/singledesignerproject' />
    }
  }

  render(){
    return(
      <Card.Group>
        {this.redirectStoryTeller()}
        {this.renderArtist()}
        {this.redirectArtist()}
        {this.renderDesigner()}
        {this.redirectDesigner()}
      </Card.Group>
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

export default exist(connect(mapStatetoProps, mapDispatchtoProps)(UncompletedProjectsContainer))
