import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CompletedProjectsContainer from './CompletedProjectsContainer';
import UncompletedProjectsContainer from './UncompletedProjectsContainer';
import UserProjectsContainer from './UserProjectsContainer';
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import SingleCompletedProjectDisplay from '../components/singleCompletedProjectDisplay'
import Login from './LoginForm';
import {connect} from 'react-redux';
import {SHOW_PROJECTS} from '../reducers/types';



class App extends Component {

  // state = {
  //   projects: []
  // }
  //
  componentDidMount(){
    fetch('http://localhost:4000/projects')
    .then(res => res.json())
    .then(projectsData => this.props.showProject(projectsData))
  }

  // renderNoneArtistProject = () =>{
  //
  //   return this.state.projects.filter(p => {
  //     return p.users.find( u => u.role === 'artist')
  //   }).map(pro => ( <div key={pro.id}>{pro.story}</div>))
  // }


  render() {
    return (
      <div className="app">
        <Router>
          <React.Fragment>
            <NavBar/>
            <Route exact path="/" render={Home}/>
            <Route exact path="/completedprojects" component={CompletedProjectsContainer}/>
            <Route exact path="/userprojects" component={UserProjectsContainer}/>
            <Route exact path="/uncompletedprojects" component={UncompletedProjectsContainer}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/singleCompletedProjectDisplay" component={SingleCompletedProjectDisplay}/>
          </React.Fragment>
        </Router>

      </div>
    );
  }
}

const mapDispatchtoProps =(dispatch) =>{
  return{
   showProject: (projectsData) => {dispatch({type:SHOW_PROJECTS, payload: projectsData })}
 }
}

export default connect(null, mapDispatchtoProps)(App);
