import {SET_NEW_USER ,  SET_CURRENT_USER} from './types'

const initialState = {
  currentUser: null
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_NEW_USER:
      return{...state,  currentUser:action.payload}
    case SET_CURRENT_USER:
      return {...state, currentUser:action.payload}
    default:
      return state;
  }
}

export default userReducer
