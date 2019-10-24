import { profileActionTypes } from '../../sagas/actionTypes';

export default function taskHistoryEntitiesReducer(state = {}, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_TASK_HISTORY_BY_ID_COMPLETE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      break;
  }
  return state;
}
