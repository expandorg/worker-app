import { keyMirror } from '../common/utils';

export const createActionTypes = (scope, actionTypes) =>
  keyMirror(actionTypes, key => `${scope}/${key}`);

export const appActionTypes = createActionTypes('app', {
  INIT: null,
  CLEAR_ERRORS: null,
});

export const web3ActionTypes = createActionTypes('web3', {
  INIT_WEB3_COMPLETE: null,
  INIT_WEB3_FAILED: null,

  INIT_GEMS: null,
  INIT_GEMS_COMPLETE: null,
  INIT_GEMS_FAILED: null,
});

export const authActionTypes = createActionTypes('auth', {
  GET_CURRENT: null,
  GET_CURRENT_COMPLETE: null,
  GET_CURRENT_FAILED: null,

  LOGIN: null,
  LOGIN_COMPLETE: null,
  LOGIN_FAILED: null,

  LOGIN_METAMASK: null,
  LOGIN_METAMASK_COMPLETE: null,
  LOGIN_METAMASK_FAILED: null,

  SIGNUP: null,
  SIGNUP_COMPLETE: null,
  SIGNUP_FAILED: null,

  SIGNUP_METAMASK: null,
  SIGNUP_METAMASK_COMPLETE: null,
  SIGNUP_METAMASK_FAILED: null,

  LOGOUT: null,
  LOGOUT_COMPLETE: null,
  LOGOUT_FAILED: null,
});


export const userActionTypes = createActionTypes('user', {
  ASSIGN_ADDRESS: null,
  ASSIGN_ADDRESS_COMPLETE: null,
  ASSIGN_ADDRESS_FAILED: null,

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

export const jobsActionTypes = createActionTypes('jobs', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  ASSIGN: null,
  ASSIGN_COMPLETE: null,
  ASSIGN_FAILED: null,
});

export const tasksActionTypes = createActionTypes('tasks', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  SUBMIT: null,
  SUBMIT_COMPLETE: null,
  SUBMIT_FAILED: null,
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

  SET_TRANSACTIONS: null,
});
