import React from 'react';
import {connect} from 'react-redux';
import {SET_NEW_PROJECT, SHOW_PROJECTS, ADD_PROJECT_TO_PROJECTS, FIND_USER_PROJECTS} from '../reducers/types'
import ProjectAdapter from '../adapters/projectAdapter'
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';
import {Redirect} from 'react-router-dom'




class CompletedProjectsContainer extends React.Component{
  state ={
    redirect:false,
    index: 0,
  }

  completedProjects = () =>{
    return this.props.projects.filter(proj => proj.users.length === 3)
  }

  componentDidMount(){
    ProjectAdapter.fetchAllProject()
    .then(projectsData => this.props.showProject(projectsData))
  }


  projectImage = () =>{
    return this.completedProjects().map(pro => pro.image_url)
  }

  projectStory = () =>{
    return this.completedProjects().map(pro => `${pro.title}: ${pro.story}`)

  }
  projectUsers = () =>{
    return this.completedProjects().map(pro => pro.title) && this.completedProjects().map(pro => pro.users.map(user => `User: ${user.username}, Role: ${user.role} `))
  }

  openLightbox =() => {
      this.setState({ isOpen: true });
    }

  closeLightbox =()=> {
    this.props.history.goBack()
  }

  redirectHomeOnClose = () =>{
    if(this.state.redirect){
      return <Redirect to="/" />
    }
  }

  moveNext =() => {
  this.setState({ index: (this.state.index + 1) % this.projectImage().length });
  }

  movePrev =() => {
    this.setState({
      index: (this.state.index + this.projectImage().length - 1) % this.projectImage().length,
    });
  }

  render(){
    console.log(this.props)
    return(
      <div>
        {this.redirectHomeOnClose()}
        <Lightbox
          mainSrc={this.projectImage()[this.state.index]}
          nextSrc={this.projectImage()[(this.state.index + 1) % this.projectImage().length]}
          prevSrc={this.projectImage()[(this.state.index + this.projectImage().length - 1) % this.projectImage().length]}
          onCloseRequest={this.closeLightbox}
          onMovePrevRequest={this.movePrev}
          onMoveNextRequest={this.moveNext}
          imageTitle={this.projectUsers()[this.state.index]}
          imageCaption={this.projectStory()[this.state.index]}
        />
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
