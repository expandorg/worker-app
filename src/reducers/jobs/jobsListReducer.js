import { jobsActionTypes } from '../../sagas/actionTypes';

const initialState = [];

export default function jobsListReducer(state = initialState, action) {
  switch (action.type) {
    case jobsActionTypes.FETCH_COMPLETE:
      return action.payload.result;
    default:
      break;
  }
  return state;
}
