import {
  appActionTypes,
  tasksActionTypes,
  userActionTypes,
  gemsActionTypes,
} from '../../sagas/actionTypes';

export default function errorsReducer(state = null, action) {
  switch (action.type) {
    case appActionTypes.CLEAR_ERRORS:
      return null;
    case tasksActionTypes.CREATE_FAILED:
    case userActionTypes.SET_EMAIL_FAILED:
    case userActionTypes.CONFIRM_EMAIL_FAILED:
    case userActionTypes.RESEND_CONFIRM_EMAIL_FAILED:
    case gemsActionTypes.FETCH_BALANCE_FAILED:
    case gemsActionTypes.WITHDRAW_FAILED:
      return (action.payload || '').toString();
    default:
      break;
  }
  return state;
}
