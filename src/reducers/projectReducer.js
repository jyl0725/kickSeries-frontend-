import {SHOW_PROJECTS, FIND_PROJECT, SET_NEW_PROJECT, ADD_PROJECT_TO_PROJECTS, PROJECT_TITLE_TAKEN, CLEAR_ERROR, SAVE_DRAWING} from './types'

const initialState = {
  projects: [],
  project: null,
  projectName: '',
  errors: '',
  drawing: '',
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
      case PROJECT_TITLE_TAKEN:
        return{...state, error: action.payload}
      case CLEAR_ERROR:
        return{...state, error: ''}
      case SAVE_DRAWING:
        return{...state, drawing:action.payload}
      default:
        return state
    }
  }

  export default projectReducer
