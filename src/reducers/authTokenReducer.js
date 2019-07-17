import { authActionTypes } from '@expandorg/app-auth';

export default function authTokenReducer(state = null, action) {
  switch (action.type) {
    case authActionTypes.GET_CURRENT_COMPLETE:
    case authActionTypes.LOGIN_COMPLETE:
    case authActionTypes.SIGNUP_COMPLETE:
    case authActionTypes.LOGIN_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_METAMASK_COMPLETE:
      return action.payload.result.token;

    case authActionTypes.LOGOUT_COMPLETE:
    case authActionTypes.GET_CURRENT_FAILED:
      return null;
    default:
      break;
  }
  return state;
}
