import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// <Router>
//   <React.Fragment>
//     <NavBar/>
//     <Route exact path="/" render={Home}/>
//     <Route exact path="/recipes" component={RecipeContainer}/>
//     <Route exact path="/cookbook" component={UserRecipeContainer}/>
//     <Route exact path="/cookbook/create" component={CreateRecipe}/>
//   </React.Fragment>
// </Router>

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

      </div>
    );
  }
}

export default App;
