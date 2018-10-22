import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Segment } from 'semantic-ui-react'


class NavBar extends React.Component{

  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
      console.log(this.props.currentUser)
       const { activeItem } = this.state
    return (
      <Segment inverted>
        <Menu inverted secondary>
        <NavLink to="/" id='borderIcon'>
          <img src="https://image.flaticon.com/icons/svg/1138/1138856.svg" height="42" width="42" alt='app_icon'/>
        </NavLink>
        <div id='navbartitle'>Kick Series</div>
        <Menu.Item  as={NavLink} exact to='/completedProjects' content='All Completed Projects' />
      {this.props.currentUser ?
        <>
         <Menu.Item  as={NavLink} exact to='/userprojectdisplay' content='All Your Project' />
         <Menu.Item  as={NavLink} exact to='/uncompletedprojects' content='Work on a Project' />
         <Menu.Menu position='right'>
         <Menu.Item  as={NavLink} exact to='/logout' content='Log Out' />
         </Menu.Menu>
        </> :
        <Menu.Menu position='right'>
          <Menu.Item  as={NavLink} exact to='/login' content='Login' />
          <Menu.Item  as={NavLink} exact to='/signUp' content='Sign Up' />
        </Menu.Menu>
      }
        </Menu>
      </Segment>
    );
    }
}


const mapStatetoProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
  }
}



export default connect(mapStatetoProps)(NavBar)
