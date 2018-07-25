import {
  authActionTypes,
  userActionTypes,
  jobsActionTypes,
  tasksActionTypes,
  gemsActionTypes,
} from '../sagas/actionTypes';

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
    case userActionTypes.CONFIRM_EMAIL_COMPLETE:
    case userActionTypes.EDIT_EMAIL_COMPLETE:
      return action.payload.user;

    case userActionTypes.UPDATED:
      return action.payload.data.user;

    case jobsActionTypes.ASSIGN_COMPLETE:
      return action.payload.result.user;

    case tasksActionTypes.SUBMIT_COMPLETE:
      return action.payload.result.user;

    case gemsActionTypes.WITHDRAW_COMPLETE:
    case gemsActionTypes.DEPOSIT_COMPLETE:
      return action.payload.user;

    default:
      break;
  }
  return state;
}
