import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () =>{
  return (
    <div id="navbarholder">
      <NavLink to="/" id='borderIcon'>
        <img src="https://image.flaticon.com/icons/svg/1138/1138856.svg" height="42" width="42" alt='app_icon'/>
      </NavLink>
      <div id='navbartitle'>Kick Series</div>
      <NavLink className='project' to="/allprojects">All Completed Project</NavLink>
      <NavLink className='project' to="/yourprojects">All Your Project</NavLink>
      <NavLink className='project' to="/workonaproject">Work on a Project</NavLink>
      <NavLink className='project' to="/login">Login</NavLink>
    </div>
  );
}

export default NavBar
