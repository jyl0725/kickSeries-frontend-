import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {SET_CURRENT_USER, FAILED_LOGIN, CHANGE_SIGNUP_LOGIN} from '../reducers/types'
import { Message ,Button, Form } from 'semantic-ui-react'
import exist from '../hocs/exist'

class Login extends React.Component{
  state ={
    username: '',
    password: '',
    redirect: false,
  }

  componentDidMount(){
    this.props.clearError()
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
    console.log(this.props.error)
    return(
      <>
        {this.props.error && <Message error header={this.props.error} />}
        <Form onSubmit={this.handleSubmit}>
          {this.renderUserStartPage()}
          <label>UserName</label>
          <Form.Input name='username' type='text' value={this.state.username} onChange={this.onChange} width={2} />
          <label>Password</label>
          <Form.Input name="password" type="password" value={this.state.password} onChange={this.onChange} width={2}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state =>{
  return{
    error: state.user.error,
    currentUser: state.user.currentUser,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    setCurrentUser: (data) => dispatch({type:SET_CURRENT_USER, payload: data}),
    failedSetUser: (data) => dispatch({type:FAILED_LOGIN, payload:data}),
    clearError: () => dispatch({type:CHANGE_SIGNUP_LOGIN}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
