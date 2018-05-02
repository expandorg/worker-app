
import { tasksActionTypes, userActionTypes } from '../sagas/actionTypes';

const initialStats = {
  pending: 0,
  accepted: 0,
  rejected: 0,
};

export default function statsReducer(state = initialStats, action) {
  switch (action.type) {
    case userActionTypes.LOGIN_COMPLETE:
    case userActionTypes.AUTHORIZE_COMPLETE:
    case tasksActionTypes.CREATE_COMPLETE:
      return action.payload.stats || initialStats;
    default:
      break;
  }
  return state;
}
