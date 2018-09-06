// @flow
import createActionTypes from '../common/app/createActionTypes';

export const appActionTypes = createActionTypes('app', {
  INIT: null,
  REFRESH: null,

  NOTIFICATION_ADD: null,
  NOTIFICATION_REMOVE: null,
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

  EDIT_EMAIL: null,
  EDIT_EMAIL_COMPLETE: null,
  EDIT_EMAIL_FAILED: null,

  CONFIRM_EMAIL: null,
  CONFIRM_EMAIL_COMPLETE: null,
  CONFIRM_EMAIL_FAILED: null,

  RESEND_CONFIRM_EMAIL: null,
  RESEND_CONFIRM_EMAIL_COMPLETE: null,
  RESEND_CONFIRM_EMAIL_FAILED: null,

  CHANGE_PASSWORD: null,
  CHANGE_PASSWORD_COMPLETE: null,
  CHANGE_PASSWORD_FAILED: null,

  RESET_PASSWORD: null,
  RESET_PASSWORD_COMPLETE: null,
  RESET_PASSWORD_FAILED: null,

  RESTORE_PASSWORD: null,
  RESTORE_PASSWORD_COMPLETE: null,
  RESTORE_PASSWORD_FAILED: null,

  UPDATED: null,
});

export const jobsActionTypes = createActionTypes('jobs', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  FETCH_LIST: null,
  FETCH_LIST_COMPLETE: null,
  FETCH_LIST_FAILED: null,

  ASSIGN: null,
  ASSIGN_COMPLETE: null,
  ASSIGN_FAILED: null,
});

export const onboardingActionTypes = createActionTypes('onboarding', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  SUBMIT: null,
  SUBMIT_COMPLETE: null,
  SUBMIT_FAILED: null,

  REPORT: null,
  REPORT_COMPLETE: null,
  REPORT_FAILED: null,

  CANCEL: null,
  CANCEL_COMPLETE: null,
  CANCEL_FAILED: null,

  REMOVE_MESSAGE: null,
});

export const tasksActionTypes = createActionTypes('tasks', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  SUBMIT: null,
  SUBMIT_COMPLETE: null,
  SUBMIT_FAILED: null,

  REPORT: null,
  REPORT_COMPLETE: null,
  REPORT_FAILED: null,

  CANCEL: null,
  CANCEL_COMPLETE: null,
  CANCEL_FAILED: null,
});

export const gemsActionTypes = createActionTypes('gems', {
  DEPOSIT: null,
  DEPOSIT_COMPLETE: null,
  DEPOSIT_FAILED: null,

  DEPOSIT_STAGE: null,

  WITHDRAW: null,
  WITHDRAW_COMPLETE: null,
  WITHDRAW_FAILED: null,

  FETCH_BALANCE: null,
  FETCH_BALANCE_COMPLETE: null,
  FETCH_BALANCE_FAILED: null,

  TRANSACTION_FAILED: null,
});
