import { jobsActionTypes } from '../sagas/actionTypes';

const initialState = [];

export default function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case jobsActionTypes.FETCH_COMPLETE:
      return action.payload;
    default:
      break;
  }
  return state;
}
