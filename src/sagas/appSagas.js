import { appActionTypes } from './actionTypes';

export const clearErrors = payload => ({
  type: appActionTypes.CLEAR_ERRORS,
  payload,
});

export const init = () => ({
  type: appActionTypes.INIT,
  payload: null,
});
