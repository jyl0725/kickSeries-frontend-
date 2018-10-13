import React from 'react'
import {Tools} from 'react-sketch';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {SET_NEW_PROJECT, SHOW_PROJECTS} from '../reducers/types'

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
    fetch('http://localhost:4000/projects/', {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: this.state.title, story: this.state.story})
  })
  .then(res => this.fetchCurretProject())
  }

  fetchCurretProject = () =>{
    fetch('http://localhost:4000/projects/')
    .then(res => res.json())
    .then(project => {
      const newProject = project.find(project => project.title === this.state.title);
      this.props.showProject(project)
      this.props.setNewProject(newProject)
      console.log(newProject)
      console.log(this.props.project)
    })
    .then(data =>{
      fetch('http://localhost:4000/project_users',{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id:this.props.currentUser.id, project_id: this.props.project.id})
      })
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
    showProject: (project) => dispatch({type: SHOW_PROJECTS ,payload: project})
  }
}
const mapStatetoProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
    project: state.project.project,
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(StoryTellerProjectForm)
