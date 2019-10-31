import { takeEvery, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { authResponseSchema } from '@expandorg/app-auth';
import { handleAsyncCall } from '@expandorg/app-utils';

import { tasksActionTypes, jobsActionTypes } from './actionTypes';

import { taskSchema, jobSchema } from '../model/schemas';
import { GtmActions } from '../common/GtmEvents';

import { tasksApi } from '../api/TasksApi';
import { jobsApi } from '../api/JobsApi';

export const fetchTask = taskId => ({
  type: tasksActionTypes.FETCH,
  payload: { taskId },
  asyncCall: tasksApi.fetch,
  meta: { schema: { task: taskSchema } },
});

export const submitTask = (taskId, response, jobId) => ({
  type: tasksActionTypes.SUBMIT,
  payload: { taskId, response },
  meta: {
    params: { taskId, response, jobId },
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

export function* tasksSagas() {
  yield takeEvery(tasksActionTypes.FETCH, handleAsyncCall);
  yield takeEvery(tasksActionTypes.SUBMIT, handleSubmitTask);
}
