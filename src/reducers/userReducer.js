import {SET_NEW_USER ,  SET_CURRENT_USER, FIND_USER_PROJECTS} from './types'

const initialState = {
  currentUser: null
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_NEW_USER:
      return{...state,  currentUser:action.payload}
    case SET_CURRENT_USER:
      return {...state, currentUser:action.payload}
    case FIND_USER_PROJECTS:
      return {...state, currentUser:action.payload}

    default:
      return state;
  }
}

export default userReducer
