import { actions } from '../actions/action-types';

export default function workerReducer(state = null, action) {
  return action.type === actions.SET_WORKER ? action.payload : state;
}
