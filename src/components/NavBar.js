import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = (props) =>{
console.log(props)

  return (
    <div id="navbarholder">
      <NavLink to="/" id='borderIcon'>
        <img src="https://image.flaticon.com/icons/svg/1138/1138856.svg" height="42" width="42" alt='app_icon'/>
      </NavLink>
      <div id='navbartitle'>Kick Series</div>
      <NavLink className='project' to="/completedprojects">All Completed Project</NavLink>
      <NavLink className='project' to="/userprojects">All Your Project</NavLink>
      <NavLink className='project' to="/uncompletedprojects">Work on a Project</NavLink>
      {
         props.currentUser ? <div key={props.currentUser.id}> Hi {props.currentUser.username} </div> :
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

export default connect(mapStatetoProps)(NavBar)
