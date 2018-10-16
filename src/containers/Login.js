import React from 'react'

class Login extends React.Component{
  state ={
    username: '',
    password: '',
  }

  onChange = (event) =>{
    this.setState({ [event.target.name]: event.target.value})
  }

  handleSubmit = (event) =>{
    event.preventDefault();

  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>UserName</label>
        <input name='username' type='text' value={this.state.username} onChange={this.onChange} />
        <label>Password</label>
        <input name='"password")' type='"current-password")' value={this.state.password} onChange={this.onChange} />
        <input type="submit" value="submit" />
      </form>
    )
  }
}

export default Login
