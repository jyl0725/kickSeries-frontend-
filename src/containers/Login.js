import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {SET_CURRENT_USER, FAILED_LOGIN} from '../reducers/types'
import { Message } from 'semantic-ui-react'

class Login extends React.Component{
  state ={
    username: '',
    password: '',
    redirect: false,
  }

  onChange = (event) =>{
    this.setState({ [event.target.name]: event.target.value})
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    fetch('http://localhost:4000/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
        'Accept': 'application/json'
     },
     body: JSON.stringify({username: this.state.username,password: this.state.password})
   })
     .then(response => {
       if (response.ok) {
         return response.json()
       } else {
         throw response
       }
     })
     .then(JSONResponse => {
       localStorage.setItem('jwt', JSONResponse.jwt)
       this.props.setCurrentUser(JSONResponse.user)
     })
     .then(()=> this.setState({username: '', password:'', redirect: true}))
     .catch(r => r.json().then(e => this.props.failedSetUser(e.message)))
 }

   renderUserStartPage = () =>{
     if(this.state.redirect){
       return <Redirect to ='/newprojectform' />
     }
   }


  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        {this.renderUserStartPage()}
        {this.props.error && <Message error header={this.props.error} />}
        <label>UserName</label>
        <input name='username' type='text' value={this.state.username} onChange={this.onChange} />
        <label>Password</label>
        <input name="password" type="password" value={this.state.password} onChange={this.onChange} />
        <input type="submit" value="submit" />
      </form>
    )
  }
}

const mapStateToProps = state =>{
  return{
    error: state.user.error
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    setCurrentUser: (data) => dispatch({type:SET_CURRENT_USER, payload: data}),
    failedSetUser: (data) => dispatch({type:FAILED_LOGIN, payload:data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
