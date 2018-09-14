import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '@gemsorg/app-utils';

import { tasksActionTypes } from './actionTypes';

import { taskSchema, authResponseSchema } from '../model/schemas';
import { GtmActions } from '../common/GtmEvents';

import { tasksApi } from '../api/TasksApi';

export const fetchTask = taskId => ({
  type: tasksActionTypes.FETCH,
  payload: { taskId },
  meta: { schema: { task: taskSchema } },
});

const watchFetchRequest = takeEveryApiCall(
  tasksActionTypes.FETCH,
  tasksApi.fetch
);

export const submitTask = (taskId, form) => ({
  type: tasksActionTypes.SUBMIT,
  payload: { taskId, form, response: form },
  meta: {
    schema: { assignedTasks: [taskSchema] },
    track: {
      action: GtmActions.TaskSubmit,
    },
  },
});

const watchCreateRequest = takeEveryApiCall(
  tasksActionTypes.SUBMIT,
  tasksApi.submitTask
);

export const reportTask = (taskId, reason, message) => ({
  type: tasksActionTypes.REPORT,
  payload: { taskId, reason, message },
  meta: {
    schema: authResponseSchema,
  },
});

const watchReportRequest = takeEveryApiCall(
  tasksActionTypes.REPORT,
  tasksApi.report
);

export const cancelTask = taskId => ({
  type: tasksActionTypes.CANCEL,
  payload: { taskId },
  meta: {
    schema: authResponseSchema,
  },
});

const watchCancelRequest = takeEveryApiCall(
  tasksActionTypes.CANCEL,
  tasksApi.cancel
);

export function* tasksSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchCreateRequest);
  yield fork(watchReportRequest);
  yield fork(watchCancelRequest);
}
