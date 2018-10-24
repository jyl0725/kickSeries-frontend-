import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CompletedProjectsContainer from './CompletedProjectsContainer';
import UncompletedProjectsContainer from './UncompletedProjectsContainer';
import NewPojectForm from './NewPojectForm';
import UserProjectDisplay from './UserProjectDisplay'
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import SignUpForm from './SignUpForm';
import SingleArtistProject from './SingleArtistProject'
import SingleDesignerProject from './SingleDesignerProject'
import {connect} from 'react-redux';
import Login from '../containers/Login'
import LogOut from '../containers/Logout'
import {SHOW_PROJECTS, SET_CURRENT_USER} from '../reducers/types';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import EditProject from './EditProject'




class App extends Component {


  componentDidMount(){
    fetch('http://localhost:4000/projects')
    .then(res => res.json())
    .then(projectsData => this.props.showProject(projectsData))

    fetch('http://localhost:4000/profile',{
      headers: {
         Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'GET',
    }).then(res=> res.json())
    .then(data => this.props.setCurrentUser(data.user))
  }

  render() {
    return (
      <Router>
          <React.Fragment>
          <NavBar/>
            <Switch >
              <Route exact path="/" render={Home}/>
              <Route exact path="/editproject" component={EditProject} />
              <Route exact path="/completedprojects" component={CompletedProjectsContainer}/>
              <Route exact path="/uncompletedprojects" component={UncompletedProjectsContainer}/>
              <Route exact path="/SignUp" component={SignUpForm}/>
              <Route exact path="/newprojectform" component={NewPojectForm}/>
              <Route exact path="/userprojectdisplay" component={UserProjectDisplay} />
              <Route exact path="/singleartistproject" component={SingleArtistProject} />
              <Route exact path="/singledesignerproject" component={SingleDesignerProject} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={LogOut} />
            </Switch>
          </React.Fragment>
      </Router>
    );
  }
}

const mapDispatchtoProps =(dispatch) =>{
  return{
   showProject: (projectsData) => {dispatch({type:SHOW_PROJECTS, payload: projectsData })},
   setCurrentUser: (user) =>{dispatch({type: SET_CURRENT_USER, payload: user})}
 }
}

export default connect(null, mapDispatchtoProps)(App);
