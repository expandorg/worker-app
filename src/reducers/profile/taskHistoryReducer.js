import { range } from '@expandorg/utils';
import { profileActionTypes } from '../../sagas/actionTypes';

const initialState = range(10).map(id => ({
  id,
  title: 'Task Name',
  submitted_at: 'Thu Sep 19 2019 21:13:48 GMT+0300',
  gems: 200,
  status: id !== 3,
}));

export default function taskHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_TASK_HISTORY_COMPLETE: {
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
