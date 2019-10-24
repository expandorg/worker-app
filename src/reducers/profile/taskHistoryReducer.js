import { profileActionTypes } from '../../sagas/actionTypes';

const initialState = {
  tasks: [],
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
