import { createReducer } from 'redux-act';
import { refreshLoginSuccess, clearLogin, onLogin } from '../actions/auth';

const DEFAULT_STATE = {
  worker: null,
  isLoggingIn: false,
};

export default createReducer({
  [refreshLoginSuccess]: (state, payload) => ({
    ...state,
    worker: payload.worker,
  }),

  [clearLogin]: state => ({
    ...state,
    ...DEFAULT_STATE,
  }),

  [onLogin]: state => ({
    ...state,
    isLoggingIn: true,
  }),
}, DEFAULT_STATE);
