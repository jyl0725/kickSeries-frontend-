import {SET_NEW_USER ,  SET_CURRENT_USER, FIND_USER_PROJECTS, LOG_OUT, FAILED_LOGIN, FAILED_SIGNUP, CHANGE_SIGNUP_LOGIN} from './types'

const initialState = {
  currentUser: null,
  error: '',
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_NEW_USER:
      return{...state,  currentUser:action.payload}
    case SET_CURRENT_USER:
      console.log(action)
      return {...state, currentUser:action.payload}
    case FIND_USER_PROJECTS:
      return {...state, currentUser:action.payload}
    case FAILED_LOGIN:
      return {...state, error:action.payload}
    case FAILED_SIGNUP:
      return {...state, error:action.payload}
    case "UPDATE_IMAGE_URL":
      let newUser = {...state.currentUser}
      let projects = [...state.currentUser.projects]
      let currentProject = projects.find(pro => pro.id === action.payload.id)
      if(currentProject){
        currentProject.image_url = action.payload.image_url
        newUser.projects = projects
        return {...state, currentUser: newUser}
        }else{
        return state
      }
    case CHANGE_SIGNUP_LOGIN:
        return{...state, error:''}
    case LOG_OUT:
      return {currentUser: ''}

    default:
      return state;
  }
}

export default userReducer
