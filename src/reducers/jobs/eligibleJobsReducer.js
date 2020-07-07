import { jobsActionTypes } from '../../sagas/actionTypes';

const initialState = {
  tasks: [],
  verifications: [],
};

export default function eligibleJobsReducer(state = initialState, action) {
  switch (action.type) {
    case jobsActionTypes.FETCH_LIST_COMPLETE:
      return {
        tasks: action.payload.result.taskJobIds || [],
        verifications: action.payload.result.verificationJobIds || [],
      };
    default:
      break;
  }
  return state;
}
