import * as actionTypes from '../actions/actionTypes';

let initialState = {};

export function userInfo(state = initialState, action){
  switch (action.type){
    case actionTypes.USER_INFO_LOGIN :
      return action.data
    default :
      return state
  }
}
