import { range } from '@expandorg/utils';
import { profileActionTypes } from '../../sagas/actionTypes';

const items = range(10).map(id => ({
  id,
  title: 'Task Name',
  submitted_at: 'Thu Sep 19 2019 21:13:48 GMT+0300',
  gems: 200,
  status: id !== 3,
}));

const initialState = {
  tasks: items,
  next: null,
  prev: null,
};

export default function taskHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_TASK_HISTORY_COMPLETE: {
      const { payload, meta } = action;
      const tasks = meta.params.cursor
        ? [...state.tasks, ...payload.tasks]
        : payload.tasks;

      return {
        ...state,
        tasks,
        next: payload.next_cursor,
        prev: payload.previous_cursor,
      };
    }
    default:
      break;
  }
  return state;
}
