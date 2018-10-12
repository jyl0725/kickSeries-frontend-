import React from 'react'
import {connect} from 'react-redux'
import {CREATE_USER, ONCHANGE_USERFORM, REMOVE_PASSWORD} from '../reducers/types'
// import userAdapter from '../adapters/userAdapter'
class Login extends React.Component{

  createUser = (event) =>{
    event.preventDefault();
    // userAdapter.postUser(this.props.form);
    fetch('http://localhost:4000/users/', {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: this.props.form.name, username: this.props.form.username, password: this.props.form.password, role: this.props.form.user })
  })
  .then(this.props.removePassword())
  }
  render(){
    console.log(this.props.form)
    return (
      <form onSubmit={this.createUser}>
        <label>
          Name:
          <input type="text" name="name" onChange={this.props.onChange}  />
        </label>
        <label>
          UserName:
          <input type="text" name="username" onChange={this.props.onChange}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.props.password} onChange={this.props.onChange}/>
        </label>
        <select name = 'user' onChange={this.props.onChange}>
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

const mapStatetoProps = (state) =>{
  return {
    form: state.user.form,
    password: state.user.form.password
  }
}
const mapDispatchtoProps = (dispatch) =>{return{
  onChange:(event) =>{dispatch({type:ONCHANGE_USERFORM, payload: {inputName:event.target.name, value:event.target.value}})},
  removePassword: () =>{dispatch({type:REMOVE_PASSWORD})}
}
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login)
