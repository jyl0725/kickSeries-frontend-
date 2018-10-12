import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FIND_PROJECT} from '../reducers/types'


class DisplayCompletedProjects extends React.Component{
  state ={
    redirect:false
  }

  setRedirect = (event) =>{
    const project = this.props.projects.find(p => p.title === event.target.innerText)
    this.props.findProject(project);
    this.setState({
      redirect: true
    })
  }

  renderSneaker = (event) =>{
    if (this.state.redirect){
  return <Redirect to='/singleCompletedProjectDisplay' />
    }
  }
  render(){
    return(
      <div id='snkr-card-container' onClick={this.setRedirect}>
        {this.renderSneaker()}
        <img src={this.props.image_url} alt='sneaker-pic' width ='200' height='200' />
         <div>
        {this.props.title}
         </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) =>{
  return{
    projectName: state.project.projectName,
    projects: state.project.projects
  }
}
const mapDispatchtoProps = (dispatch) =>{
  return{
    findProject: (project) => dispatch({type: FIND_PROJECT, payload: project})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(DisplayCompletedProjects)
