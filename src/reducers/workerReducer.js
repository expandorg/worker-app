import { actions, userActionTypes, gemsActionTypes } from '../actions/action-types';

export default function workerReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_WORKER:
      return action.payload;
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
