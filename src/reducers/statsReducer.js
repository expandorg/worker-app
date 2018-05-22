
import { tasksActionTypes, authActionTypes } from '../sagas/actionTypes';

const initialStats = {
  pending: 0,
  accepted: 0,
  rejected: 0,
};

export default function statsReducer(state = initialStats, action) {
  switch (action.type) {
    case authActionTypes.GET_CURRENT_COMPLETE:
    case authActionTypes.LOGIN_COMPLETE:
    case authActionTypes.LOGIN_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_COMPLETE:
    case tasksActionTypes.CREATE_COMPLETE:
      return action.payload.stats || initialStats;
    default:
      break;
  }
  return state;
}
