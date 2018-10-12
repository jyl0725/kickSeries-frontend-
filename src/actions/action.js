import userAdapter from '../adapters/userAdapter'
import {CREATE_USER} from '../reducers/types'

export function createUser(name, userName, password, role) {
  return (dispatch) =>{
    dispatch({type: 'FETCH_POSTING_USER'})
    userAdapter.postUser(name, userName, password, role)
  }
}
