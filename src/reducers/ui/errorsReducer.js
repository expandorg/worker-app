import { actions, tasksActionTypes } from '../../actions/action-types';

export default function errorsReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_ERROR:
      return action.payload;
    case tasksActionTypes.CREATE_FAILED:
      return (action.payload || '').toString();
    default:
      break;
  }
  return state;
}
