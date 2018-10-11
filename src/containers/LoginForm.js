import React from 'react'

class Login extends React.Component{
  render(){
    return (
      <form onSubmit>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          UserName:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
    </form>
    )
  }
}

export default Login
