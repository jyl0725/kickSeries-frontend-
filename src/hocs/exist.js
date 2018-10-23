import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {SET_CURRENT_USER} from '../reducers/types';


const exist = (WrappedComponent) =>{
  class ExistenceComponent extends React.Component{

    componentDidMount(){
      if(localStorage.getItem('jwt')){
        fetch('http://localhost:4000/profile',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        method: 'GET',
        })
        .then(res=> res.json())
        .then(data => this.props.setCurrentUser(data.user))
      }


    }
    render(){
      if(this.props.currentUser){
         return <WrappedComponent />
      }else{
        return <div></div>
      }
    }
  }


  const mapStateToProps = state => {
     return {
       currentUser: state.user.currentUser,
       project: state.project.project,
     }
   }

  const mapDispatchToProps = dispatch =>{
    return{
      setCurrentUser: (user) =>{dispatch({type: SET_CURRENT_USER, payload: user})}
    }
  }

   return connect(mapStateToProps, mapDispatchToProps)(ExistenceComponent)
}

 export default exist
