import { profileActionTypes } from '../../sagas/actionTypes';

export default function taskHistoryReducer(state = [], action) {
  switch (action.type) {
    case profileActionTypes.FETCH_TASK_HISTORY: {
      const { payload, meta } = action;
      if (!meta.params.page) {
        return payload;
      }
      return [...state, ...payload];
    }
    default:
      break;
  }
  return state;
}
