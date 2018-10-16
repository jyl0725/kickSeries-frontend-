import React from 'react';
import {connect} from 'react-redux';

class SingleDesignerProject extends React.Component{
  render(){
    return(
      <div>
        <div>{this.props.project.title}</div>
        <div>{this.props.project.story}</div>
      </div>
    )
  }
}

const mapStatetoProps = state =>{
  return{
    project: state.project.project,
    currentUser: state.user.currentUser,
  }
}

export default connect(mapStatetoProps)(SingleDesignerProject)
