import {Create_User} from './types'

const initialState = {
  current User: ""
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case Create_User:
    return {}
  }
}

export default userReducer
