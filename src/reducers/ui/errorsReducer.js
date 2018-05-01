import { actions, tasksActionTypes, userActionTypes } from '../../actions/action-types';

export default function errorsReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_ERROR:
      return action.payload;
    case tasksActionTypes.CREATE_FAILED:
      return (action.payload || '').toString();

    case userActionTypes.SET_EMAIL_FAILED:
    case userActionTypes.CONFIRM_EMAIL_FAILED:
    case userActionTypes.RESEND_CONFIRM_EMAIL_FAILED:
      return (action.payload || '').toString();
    default:
      break;
  }
  return state;
}
