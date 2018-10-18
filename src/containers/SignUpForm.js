import React from 'react'
import {connect} from 'react-redux'
import {SET_CURRENT_USER} from '../reducers/types'
import {Redirect} from 'react-router-dom'
import { Button, Form, Dropdown } from 'semantic-ui-react'
// import userAdapter from '../adapters/userAdapter'


class SignUpForm extends React.Component{
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

  handleSelectionChange = (event) =>{
    this.setState({
      role: event.target.innerText
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
  }).then(res => res.json())
  .then(data =>{
    this.props.setCurrentUser(data.user);
    localStorage.setItem('jwt', data.jwt);
  }).then(()=> this.setState({name: '', password: '', role:'', redirect: true}))
  // .then(res => this.fetchCurrentUser())

  }

  // fetchCurrentUser = () =>{
  //   fetch('http://localhost:4000/users/')
  //   .then(res => res.json())
  //   .then(users => {
  //     const currentUser = users.find(user => user.username === this.state.username);
  //     this.props.setCurrentUser(currentUser)
  //     console.log(currentUser)
  //   })
  //   .then(this.setState({ name: '', password: '', role:'', redirect: true}))
  // }

  renderUserStartPage = () =>{
    if(this.state.redirect){
      return <Redirect to ='/newprojectform' />
    }
  }

  render(){
    const options = [{ key: 1, text: 'story teller', name: 'story teller', value: 'story teller' }, { key: 2, text: 'artist', name: 'artist', value: 'artist' }, { key: 3, text: 'designer', name: 'designer', value: 'designer' }]
    return (
      <Form onSubmit={this.createAndSetCurrentUser}>
        {this.renderUserStartPage()}
        <Form.Field>
          <label>Name</label>
          <Form.Input type="text" name="name" value={this.state.name} onChange={this.handleChange} width={2}/>
        </Form.Field>
        <Form.Field>
          <label>UserName</label>
          <Form.Input type="text" name="username" value={this.state.username} onChange={this.handleChange} width={2}/>
        </Form.Field>
        <Form.Field>
          <label>Enter Password</label>
          <Form.Input type="password" name="password" value={this.state.password} onChange={this.handleChange} width={2}/>
        </Form.Field>
      <Dropdown placeholder='Role' compact selection options={options} onChange={this.handleSelectionChange} />
        <Button type='submit'>Submit</Button>
    </Form>



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
export default connect(null, mapDispatchtoProps)(SignUpForm)
