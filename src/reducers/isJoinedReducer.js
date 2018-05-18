import { tasksActionTypes } from '../sagas/actionTypes';

export default function isJoinedReducer(state = false, action) {
  switch (action.type) {
    case tasksActionTypes.JOIN:
      return action.payload;
    default:
      break;
  }
  return state;
}
