import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CompletedProjectsContainer from './CompletedProjectsContainer';
import UncompletedProjectsContainer from './UncompletedProjectsContainer';
import NewPojectForm from './NewPojectForm';
import UserProjectDisplay from './UserProjectDisplay'
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import SingleCompletedProjectDisplay from '../components/singleCompletedProjectDisplay'
import SignUpForm from './SignUpForm';
import SingleArtistProject from './SingleArtistProject'
import {connect} from 'react-redux';
import Login from '../containers/Login'
import SingleDesignerProject from './SingleDesignerProject'
import {SHOW_PROJECTS} from '../reducers/types';



class App extends Component {


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
            <Route exact path="/uncompletedprojects" component={UncompletedProjectsContainer}/>
            <Route exact path="/SignUp" component={SignUpForm}/>
            <Route exact path="/singleCompletedProjectDisplay" component={SingleCompletedProjectDisplay}/>
            <Route exact path="/newprojectform" component={NewPojectForm}/>
            <Route exact path="/userprojectdisplay" component={UserProjectDisplay} />
            <Route exact path="/singlearistproject" component={SingleArtistProject} />
            <Route exact path="/singledesignerproject" component={SingleDesignerProject} />
            <Route exact path="/login" component={Login} />
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
