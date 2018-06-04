import { appActionTypes } from './actionTypes';

export const refresh = () => ({
  type: appActionTypes.REFRESH,
  payload: null,
});

export const init = () => ({
  type: appActionTypes.INIT,
  payload: null,
});
