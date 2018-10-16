import React from 'react';
import {connect} from 'react-redux';
import DisplayCompletedProjects from '../components/displayCompletedProjects'
import {SET_NEW_PROJECT, SHOW_PROJECTS, ADD_PROJECT_TO_PROJECTS, FIND_USER_PROJECTS} from '../reducers/types'




class CompletedProjectsContainer extends React.Component{

  componentDidMount(){
    fetch('http://localhost:4000/projects')
    .then(res => res.json())
    .then(projectsData => this.props.showProject(projectsData))
  }

  renderCompletedProject(){
    return  this.props.projects.filter(p => p.users.length === 3)
      .map(pro => <DisplayCompletedProjects key={pro.id} {...pro} />)
  }
  render(){
    return(
      <div>
        {this.renderCompletedProject()}
      </div>
    )
  }

}

const mapStatetoProps = (state)=>{
  return{
    projects: state.project.projects
  }
}

const mapDispatchtoProps = dispatch =>{
  return{
    showProject: (projectsData) =>dispatch({type:SHOW_PROJECTS, payload: projectsData})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(CompletedProjectsContainer)
