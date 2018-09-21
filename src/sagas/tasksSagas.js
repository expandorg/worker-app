import { fork, takeEvery, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { takeEveryApiCall } from '@gemsorg/app-utils';
import { tasksActionTypes, jobsActionTypes } from './actionTypes';

import { taskSchema, jobSchema, authResponseSchema } from '../model/schemas';
import { GtmActions } from '../common/GtmEvents';

import { tasksApi } from '../api/TasksApi';
import { jobsApi } from '../api/JobsApi';

export const fetchTask = taskId => ({
  type: tasksActionTypes.FETCH,
  payload: { taskId },
  meta: { schema: { task: taskSchema } },
});

const watchFetchRequest = takeEveryApiCall(
  tasksActionTypes.FETCH,
  tasksApi.fetch
);

export const submitTask = (taskId, response) => ({
  type: tasksActionTypes.SUBMIT,
  payload: { taskId, response },
  meta: {
    track: {
      action: GtmActions.TaskSubmit,
    },
  },
});

function* handleSubmitTask({ payload, meta }) {
  try {
    const submitResponse = yield call(tasksApi.submitTask, payload);
    try {
      const jobs = yield call(jobsApi.list);
      yield put({
        type: jobsActionTypes.FETCH_LIST_COMPLETE,
        payload: normalize(jobs, { jobs: [jobSchema] }),
      });
    } catch (e) {
      yield put({ type: jobsActionTypes.FETCH_LIST_FAILED, payload: e });
    }
    yield put({
      type: tasksActionTypes.SUBMIT_COMPLETE,
      payload: normalize(submitResponse, authResponseSchema),
      complete: true,
      meta,
    });
  } catch (error) {
    yield put({
      type: tasksActionTypes.SUBMIT_FAILED,
      payload: error,
      failed: true,
      meta,
    });
  }
}

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
  yield fork(watchReportRequest);
  yield fork(watchCancelRequest);
  yield takeEvery(tasksActionTypes.SUBMIT, handleSubmitTask);
}
