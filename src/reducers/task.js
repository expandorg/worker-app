import { createReducer } from 'redux-act';
import { onLoginSuccess } from '../actions/auth';

export default createReducer({
  [onLoginSuccess]: (state, payload) => payload.task,
}, null);
