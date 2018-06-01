import { authActionTypes, userActionTypes, jobsActionTypes } from '../sagas/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.GET_CURRENT_COMPLETE:
    case authActionTypes.LOGIN_COMPLETE:
    case authActionTypes.SIGNUP_COMPLETE:
    case authActionTypes.LOGIN_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_METAMASK_COMPLETE:
      return action.payload.result.user;

    case authActionTypes.LOGOUT_COMPLETE:
    case authActionTypes.GET_CURRENT_FAILED:
      return initialState;

    case userActionTypes.ASSIGN_ADDRESS_COMPLETE:
      return action.payload.user;

    case jobsActionTypes.ASSIGN_COMPLETE:
      return action.payload.result.user;
    default:
      break;
  }
  return state;
}
