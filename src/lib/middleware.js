import { clearLogin, refreshLoginSuccess } from '../actions/auth';

export default () => next => (action) => {
  if (action.type === clearLogin.getType() || action.type === refreshLoginSuccess.getType()) {
    document.cookie = `JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.COOKIE_DOMAIN}; path=/;`;
  }

  return next(action);
};

