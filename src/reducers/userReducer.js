import {SET_NEW_USER ,  SET_CURRENT_USER, FIND_USER_PROJECTS, LOG_OUT, FAILED_LOGIN} from './types'

const initialState = {
  currentUser: null,
  error: '',
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_NEW_USER:
      return{...state,  currentUser:action.payload}
    case SET_CURRENT_USER:
      return {...state, currentUser:action.payload}
    case FIND_USER_PROJECTS:
      return {...state, currentUser:action.payload}
    case FAILED_LOGIN:
      return {...state, error:action.payload}
    case LOG_OUT:
      return {currentUser: ''}

    default:
      return state;
  }
}

export default userReducer
