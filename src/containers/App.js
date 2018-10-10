import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CompletedProjectsContainer from './CompletedProjectsContainer'
import UnCompletedProjectsContainer from './UnCompletedProjectsContainer'
import UserProjectsContainer from './UserCompletedProjectsContainer'


class App extends Component {

  // state = {
  //   projects: []
  // }
  //
  // componentDidMount(){
  //   fetch('http://localhost:4000/projects')
  //   .then(res => res.json())
  //   .then(projectsData => this.setState({
  //     projects: projectsData
  //   }))
  // }
  //
  // renderNoneArtistProject = () =>{
  //
  //   return this.state.projects.filter(p => {
  //     return p.users.find( u => u.role === 'artist')
  //   }).map(pro => ( <div key={pro.id}>{pro.story}</div>))
  // }

  render() {
    console.log(this.state.projects)
    return (
      <div className="app">
        // {this.renderNoneArtistProject()}
        <Router>
          <React.Fragment>
            <NavBar/>
            <Route exact path="/" render={Home}/>
            <Route exact path="/completedrojects" component={CompletedProjectsContainer}/>
            <Route exact path="/userprojects" component={UserProjectsContainer}/>
            <Route exact path="/uncompletedprojects" component={UncompletedProjectsContainer}/>
          </React.Fragment>
        </Router>

      </div>
    );
  }
}

export default App;
