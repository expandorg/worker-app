import { userActionTypes } from '../../sagas/actionTypes';

export default function isAuthorizedReducer(state = null, action) {
  switch (action.type) {
    case userActionTypes.AUTHORIZE_COMPLETE:
    case userActionTypes.LOGIN_COMPLETE:
      return true;
    case userActionTypes.LOGOUT_COMPLETE:
      return false;
    default:
      break;
  }
  return state;
}
