// @flow
import { createActionTypes } from '@expandorg/app-utils';

export const jobsActionTypes = createActionTypes('jobs', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  FETCH_LIST: null,
  FETCH_LIST_COMPLETE: null,
  FETCH_LIST_FAILED: null,

  FETCH_PREVIEW: null,
  FETCH_PREVIEW_COMPLETE: null,
  FETCH_PREVIEW_FAILED: null,

  ASSIGN_TASK: null,
  ASSIGN_TASK_COMPLETE: null,
  ASSIGN_TASK_FAILED: null,

  ASSIGN_VERIFICATION: null,
  ASSIGN_VERIFICATION_COMPLETE: null,
  ASSIGN_VERIFICATION_FAILED: null,
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

  REMOVE_MESSAGE: null,
});

export const tasksActionTypes = createActionTypes('tasks', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  SUBMIT: null,
  SUBMIT_COMPLETE: null,
  SUBMIT_FAILED: null,

  VERIFY: null,
  VERIFY_COMPLETE: null,
  VERIFY_FAILED: null,
});

export const assignmentActionTypes = createActionTypes('assignments', {
  REPORT: null,
  REPORT_COMPLETE: null,
  REPORT_FAILED: null,

  CANCEL: null,
  CANCEL_COMPLETE: null,
  CANCEL_FAILED: null,
});

export const responsesActionTypes = createActionTypes('responses', {
  VERIFY: null,
  VERIFY_COMPLETE: null,
  VERIFY_FAILED: null,
});

export const profileActionTypes = createActionTypes('profile', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  FETCH_FILTERS: null,
  FETCH_FILTERS_COMPLETE: null,
  FETCH_FILTERS_FAILED: null,

  SAVE: null,
  SAVE_COMPLETE: null,
  SAVE_FAILED: null,

  SUMMARY: null,
  SUMMARY_COMPLETE: null,
  SUMMARY_FAILED: null,

  FETCH_TASK_HISTORY: null,
  FETCH_TASK_HISTORY_COMPLETE: null,
  FETCH_TASK_HISTORY_FAILED: null,

  FETCH_TASK_HISTORY_BY_ID: null,
  FETCH_TASK_HISTORY_BY_ID_COMPLETE: null,
  FETCH_TASK_HISTORY_BY_ID_FAILED: null,

  START_DISPUTE: null,
  START_DISPUTE_COMPLETE: null,
  START_DISPUTE_FAILED: null,

  FETCH_DISPUTES: null,
  FETCH_DISPUTES_COMPLETE: null,
  FETCH_DISPUTES_FAILED: null,
});

export const transactionActionTypes = createActionTypes('transactions', {
  FETCH_LIST: null,
  FETCH_LIST_COMPLETE: null,
  FETCH_LIST_FAILED: null,
});
