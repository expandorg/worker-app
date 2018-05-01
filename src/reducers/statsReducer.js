
import { actions, tasksActionTypes } from '../actions/action-types';

const initialStats = {
  pending: 0,
  accepted: 0,
  rejected: 0,
};

export default function statsReducer(state = initialStats, action) {
  switch (action.type) {
    case actions.SET_STATS:
      return action.payload || initialStats;
    case tasksActionTypes.CREATE_COMPLETE:
      return action.payload.stats || initialStats;
    default:
      break;
  }
  return state;
}
