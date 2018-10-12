import {SHOW_PROJECTS} from './types'

const initialState = {
  projects: [],
  project: {
    title: '',
    story: '',
    image_url: '',
  }
}

  const projectReducer = (state = initialState, action) =>{
    switch(action.type){
      case SHOW_PROJECTS:
        return {...state, projects: action.payload};
      default:
        return state
    }
  }

  export default projectReducer
