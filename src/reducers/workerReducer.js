import { userActionTypes, gemsActionTypes } from '../sagas/actionTypes';

export default function workerReducer(state = null, action) {
  switch (action.type) {
    case userActionTypes.LOGIN_COMPLETE:
    case userActionTypes.AUTHORIZE_COMPLETE:
    case userActionTypes.SET_EMAIL_COMPLETE:
    case userActionTypes.CONFIRM_EMAIL_COMPLETE:
      return action.payload.worker;
    case gemsActionTypes.WITHDRAW_COMPLETE:
      return action.payload.worker;
    default:
      break;
  }
  return state;
}
