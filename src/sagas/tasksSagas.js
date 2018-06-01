import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { tasksActionTypes } from './actionTypes';

import { taskSchema } from '../model/schemas';

import { tasksApi } from '../api/TasksApi';

export const fetchTask = taskId => ({
  type: tasksActionTypes.FETCH,
  payload: { taskId },
  meta: { schema: { task: taskSchema } },
});

const watchFetchRequest = takeEveryApiCall(tasksActionTypes.FETCH, tasksApi.fetch);

export const submitTask = submission => ({
  type: tasksActionTypes.SUBMIT,
  payload: { submission },
});

const watchCreateRequest = takeEveryApiCall(tasksActionTypes.SUBMIT, tasksApi.submitTask);


export function* tasksSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchCreateRequest);
}
