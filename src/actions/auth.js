import { createAction } from 'redux-act';

const refreshLogin = createAction('Refresh log in state');
const refreshLoginSuccess = createAction('Success refreshing login state');
const refreshLoginError = createAction('Error when refreshing login state');

const onLogin = createAction('Logging in');
const onLoginSuccess = createAction('Logging in success');
const onLoginError = createAction('Logging in error');

// AKA Logout
const clearLogin = createAction('Reset auth');

export {
  refreshLogin,
  refreshLoginSuccess,
  refreshLoginError,

  onLogin,
  onLoginSuccess,
  onLoginError,

  clearLogin,
};
