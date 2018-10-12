import {CREATE_USER,ONCHANGE_USERFORM, REMOVE_PASSWORD} from './types'

const initialState = {
  form:{
    name: '',
    username:'',
    password: '',
    user: '',
  }
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    // case CREATE_USER:
    //   //action.payload : is your user data
    //   return {
    //     ...state,
    //     user: action.payload};
    case ONCHANGE_USERFORM:
      const {inputName, value} = action.payload
      return {...state, form:{...state.form, [inputName]:value}}
    case REMOVE_PASSWORD:
      return{...state, form:{...state.form, password:''}}
    default:
      return state;
  }
}

export default userReducer
