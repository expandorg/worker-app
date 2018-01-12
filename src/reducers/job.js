import { createReducer } from 'redux-act';
import { onLoginSuccess } from '../actions/auth';

const DEFAULT_STATE = {
  assignedJobID: null,
  previousJobID: null,
};

export default createReducer({
  [onLoginSuccess]: (state, payload) => ({
    ...state,
    assignedJobID: payload.job && payload.job.id,
    previousJobID: payload.job && payload.job.id,
  }),
}, DEFAULT_STATE);
