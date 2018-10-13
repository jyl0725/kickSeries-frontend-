import {SHOW_PROJECTS, FIND_PROJECT, SET_NEW_PROJECT, ADD_PROJECT_TO_PROJECTS} from './types'

const initialState = {
  projects: [],
  project: null,
  projectName: ''
}

  const projectReducer = (state = initialState, action) =>{
    switch(action.type){
      case SHOW_PROJECTS:
        return {...state, projects: action.payload};
      case FIND_PROJECT:
        return {...state, project: action.payload}
      case SET_NEW_PROJECT:
        return {...state, project: action.payload}
      case ADD_PROJECT_TO_PROJECTS:
        return{...state, projects: action.payload}
      default:
        return state
    }
  }

  export default projectReducer
