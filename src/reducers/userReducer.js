import { authActionTypes } from '../sagas/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.GET_CURRENT_COMPLETE:
      return action.payload.user;
    case authActionTypes.LOGIN_COMPLETE:
      return action.payload.user;
    case authActionTypes.LOGIN_METAMASK_COMPLETE:
      return action.payload.user;
    case authActionTypes.SIGNUP_COMPLETE:
      return action.payload.user;
    case authActionTypes.LOGOUT_COMPLETE:
    case authActionTypes.GET_CURRENT_FAILED:
      return initialState;
    default:
      break;
  }
  return state;
}
