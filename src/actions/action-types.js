import { keyMirror } from '../common/utils';

export const createActionTypes = (scope, actionTypes) =>
  keyMirror(actionTypes, key => `${scope}/${key}`);

export const actions = createActionTypes('common', {
  SET_ERROR: null,
  SET_IS_AUTHORIZED: null,
  SET_IS_JOINED: null,
  SET_STATS: null,
  SET_WORKER: null,
  SET_TRANSACTIONS: null,
});

export const appActionTypes = createActionTypes('app', {
  INIT_WEB3: null,
  INIT_WEB3_COMPLETE: null,
  INIT_WEB3_FAILED: null,

  INIT_GEMS: null,
  INIT_GEMS_COMPLETE: null,
  INIT_GEMS_FAILED: null,
});

export const userActionTypes = createActionTypes('user', {

  SET_EMAIL: null,
  SET_EMAIL_COMPLETE: null,
  SET_EMAIL_FAILED: null,

  CONFIRM_EMAIL: null,
  CONFIRM_EMAIL_COMPLETE: null,
  CONFIRM_EMAIL_FAILED: null,

  RESEND_CONFIRM_EMAIL: null,
  RESEND_CONFIRM_EMAIL_COMPLETE: null,
  RESEND_CONFIRM_EMAIL_FAILED: null,
});


export const tasksActionTypes = createActionTypes('tasks', {
  CREATE: null,
  CREATE_COMPLETE: null,
  CREATE_FAILED: null,
});

export const gemsActionTypes = createActionTypes('gems', {
  DEPOSIT: null,
  DEPOSIT_STAGE: null,
  DEPOSIT_COMPLETE: null,
  DEPOSIT_FAILED: null,

  WITHDRAW: null,
  WITHDRAW_COMPLETE: null,
  WITHDRAW_FAILED: null,

  FETCH_BALANCE: null,
  FETCH_BALANCE_COMPLETE: null,
  FETCH_BALANCE_FAILED: null,
});
