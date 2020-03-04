import { jobsActionTypes } from '../../sagas/actionTypes';

const initialState = [];

export default function jobsListReducer(state = initialState, action) {
  switch (action.type) {
    case jobsActionTypes.FETCH_LIST_COMPLETE:
      return action.payload.result.jobs;
    default:
      break;
  }
  return state;
}
