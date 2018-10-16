import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOG_OUT } from '../reducers/types'

const NavBar = (props) =>{

  const handleClick = (event) =>{
    props.LogOut()
  }
  return (
    <div id="navbarholder">
      <NavLink to="/" id='borderIcon'>
        <img src="https://image.flaticon.com/icons/svg/1138/1138856.svg" height="42" width="42" alt='app_icon'/>
      </NavLink>
      <div id='navbartitle'>Kick Series</div>
      <NavLink className='project' to="/completedprojects">All Completed Project</NavLink>
      {
         props.currentUser ?
         <div key={props.currentUser.id}> Hi {props.currentUser.username}
           <div>
             <NavLink className='project' to="/userprojectdisplay">All Your Project</NavLink>
             <NavLink className='project' to="/uncompletedprojects">Work on a Project</NavLink>
             <NavLink className='project' to="/logout">Log Out</NavLink>
           </div>
         </div> :
        <div>

          <NavLink className='project' to="/login">Login</NavLink>
          <NavLink className='project' to="/signUp">Sign Up</NavLink>
        </div>
      }
    </div>
  );
}


const mapStatetoProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
  }
}

const mapDispatchtoProps = (dispatch) =>{
  return {
    LogOut: () => dispatch({type: LOG_OUT})
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(NavBar)
