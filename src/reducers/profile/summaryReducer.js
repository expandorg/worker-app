import { profileActionTypes } from '../../sagas/actionTypes';

const initialState = {
  taskSubmitted: 0,
  gemsEarned: 0,
};

export default function summaryReducer(state = initialState, action) {
  switch (action.type) {
    case profileActionTypes.SUMMARY_COMPLETE: {
      // eslint-disable-next-line camelcase
      const { total_tasks_submitted, total_gems_earned } = action.payload;
      return {
        ...state,
        taskSubmitted: total_tasks_submitted,
        gemsEarned: total_gems_earned,
      };
    }
    default:
      break;
  }
  return state;
}
