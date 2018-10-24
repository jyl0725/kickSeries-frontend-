import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {SET_CURRENT_USER} from '../reducers/types';


const directTo = (WrappedComponent) =>{
  class RedirectComponent extends React.Component{

    render(){
      if(this.props.project){
         return <WrappedComponent/>
      }else{
        return <Redirect to='/userprojectdisplay' />
      }
    }
  }

  const mapStateToProps = state => {
     return {
       project: state.project.project,
       currentUser: state.user.currentUser,
     }
   }

   const mapDispatchToProps = dispatch =>{
     return{
       setCurrentUser: (user) =>{dispatch({type: SET_CURRENT_USER, payload: user})}
     }
   }

    return connect(mapStateToProps, mapDispatchToProps)(RedirectComponent)

}

 export default directTo
