import React from 'react';
import {connect} from 'react-redux'


class EditProject extends React.Component{
  render(){
    return(

    )
  }
}

const mapStateToProps = state =>{
  return{
    project: state.project.project,
    currentUser: state.user.currentUser,
  }
}

const mapDispatchToProps = dispatch =>{
  return{

  }
}
export defaut connect(mapStateToProps, mapDispatchToProps)(EditProject)
