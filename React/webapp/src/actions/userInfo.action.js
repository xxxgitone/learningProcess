import * as actionTypes from './actionTypes';

export function updateUserInfo(data){
  return {
    type: actionTypes.USER_INFO_LOGIN,
    data
  }
}