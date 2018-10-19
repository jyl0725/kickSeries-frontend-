import React from 'react'
import {Tools} from 'react-sketch';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {SET_NEW_PROJECT, SHOW_PROJECTS, ADD_PROJECT_TO_PROJECTS, FIND_USER_PROJECTS} from '../reducers/types'
import ProjectAdapter from '../adapters/projectAdapater'

class StoryTellerProjectForm extends React.Component{

  state = {
    title: '',
    story: '',
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name] :event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    ProjectAdapter.postProject(this.state.title, this.state.story)
    .then(res => this.fetchCurretProject())
  }

  fetchCurretProject = () =>{
    fetch('http://localhost:4000/projects/')
    .then(res => res.json())
    .then(project => {
      const newProject = project.find(project => project.title === this.state.title);
      console.log(project)
      this.props.showProject(project)
      this.props.setNewProject(newProject)
    })
    .then(() =>{
      fetch('http://localhost:4000/project_users',{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id:this.props.currentUser.id, project_id: this.props.project.id})
      })
      .then(res => res.json())
      .then(pu => {
        let projects = this.props.projects
        let pro = this.props.projects.find(proj => proj.id === pu.project_id)
        pro.users.push(pu.user)
        this.props.setNewProject(pro)
        this.props.addProjectToProjects(projects)
      })
    .then(() => this.setState({title: '', story: ''}))
    })
  }

  render(){
    return (
      (this.props.currentUser && this.props.currentUser.role === 'story teller') ?
      <div>
        <h1> Create your own Story </h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
          </label>
          <input type= 'text' name='title' value={this.state.title} onChange ={this.handleChange}/>
          <br />
          <textarea  name='story' value={this.state.story} onChange={this.handleChange} style={{height:'100px', width:'450px'}}/>
          <input type='submit' value ='submit' />
        </form>
      </div> :
      <div> Help some one complete their story</div>
    )
  }

}

const mapDispatchtoProps =(dispatch) =>{
  return {
    setNewProject: (newProject) => dispatch({type:SET_NEW_PROJECT, payload: newProject}),
    showProject: (project) => dispatch({type: SHOW_PROJECTS ,payload: project}),
    addProjectToProjects: (project) => dispatch({type: ADD_PROJECT_TO_PROJECTS, payload:project}),
    findUserProjects: (data) => dispatch({type:FIND_USER_PROJECTS, payload: data })
  }
}
const mapStatetoProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
    project: state.project.project,
    projects: state.project.projects,
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(StoryTellerProjectForm)
