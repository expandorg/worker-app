import { actions } from '../actions/action-types';

export default function workerReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_WORKER:
      return action.payload;
    default:
      break;
  }
  return state;
}
