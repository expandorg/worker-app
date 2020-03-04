import { jobsActionTypes } from '../../sagas/actionTypes';

export default function previewSamplesReducer(state = {}, action) {
  switch (action.type) {
    case jobsActionTypes.FETCH_PREVIEW_COMPLETE: {
      const { meta, payload } = action;
      return { ...state, [meta.params.jobId]: payload.result.sample };
    }
    default:
      break;
  }
  return state;
}
