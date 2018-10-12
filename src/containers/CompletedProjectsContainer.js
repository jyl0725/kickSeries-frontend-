import React from 'react';
import {connect} from 'react-redux';
import DisplayCompletedProjects from '../components/displayCompletedProjects'



class CompletedProjectsContainer extends React.Component{

  renderCompletedProject(){
    return  this.props.projects.filter(p => p.users.length === 3)
      .map(pro => <DisplayCompletedProjects key={pro.id} {...pro} />)
  }
  render(){
    console.log(this.props.projects)
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

export default connect(mapStatetoProps)(CompletedProjectsContainer)
