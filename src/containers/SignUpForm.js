import React from 'react'
import {connect} from 'react-redux'
import {SET_CURRENT_USER} from '../reducers/types'
// import userAdapter from '../adapters/userAdapter'
class SignUp extends React.Component{
  state = {
    name:'',
    username: '',
    password: '',
    role: '',
    redirect: false,
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createAndSetCurrentUser = (event) =>{
    event.preventDefault();
    // userAdapter.postUser(this.props.form);
    fetch('http://localhost:4000/users/', {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: this.state.name, username: this.state.username, password: this.state.password, role: this.state.role })
  })
  .then(res => this.fetchCurrentUser())

  }

  fetchCurrentUser = () =>{
    fetch('http://localhost:4000/users/')
    .then(res => res.json())
    .then(users => {
      const currentUser = users.find(user => user.username === this.state.username);
      this.props.setCurrentUser(currentUser)
      console.log(currentUser)
    })
    .then(this.setState({ name: '', password: '', role:'' }))
  }

  render(){
    return (
      <form onSubmit={this.createAndSetCurrentUser}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}  />
        </label>
        <label>
          UserName:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        </label>
        <select name = 'role' onChange={this.handleChange}>
          <option value='select'>Select</option>
          <option value ='artist'>Artist</option>
          <option value ='designer'>Designer</option>
          <option value ='story teller'>Story Teller</option>
        </select>
        <input type="submit" value="Submit" />
    </form>
    )
  }
}

// const mapStatetoProps = (state) =>{
//   return {
//     form: state.user.form,
//     password: state.user.form.password
//   }
// }
const mapDispatchtoProps = (dispatch) =>{
  return{
    setCurrentUser: (currentUser) => dispatch({type: SET_CURRENT_USER, payload:currentUser})
  }
}
export default connect(null, mapDispatchtoProps)(SignUp)
