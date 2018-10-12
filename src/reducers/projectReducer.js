import {SHOW_PROJECTS, FIND_PROJECT} from './types'

const initialState = {
  projects: [],
  project: {
    title: '',
    story: '',
    image_url: '',
  },
  projectName: ''
}

  const projectReducer = (state = initialState, action) =>{
    switch(action.type){
      case SHOW_PROJECTS:
        return {...state, projects: action.payload};
      case FIND_PROJECT:
        return {...state, project: action.payload}
      default:
        return state
    }
  }

  export default projectReducer
