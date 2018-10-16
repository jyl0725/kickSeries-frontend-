import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { LOG_OUT } from '../reducers/types'

const LogOut = (props) =>{

  const renderHome = () =>{
    props.logOut();
    return <Redirect to='/' />
  }

    return(
      <div>
        {renderHome()}
      </div>
    )
  }


const mapDispatchtoProps = (dispatch) =>{
  return{
    logOut: () => dispatch({type: LOG_OUT})
  }
}

export default connect(null, mapDispatchtoProps)(LogOut)
