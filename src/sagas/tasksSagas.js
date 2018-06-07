import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { tasksActionTypes } from './actionTypes';

import { taskSchema, assignmentSchema } from '../model/schemas';

import { tasksApi } from '../api/TasksApi';

export const fetchTask = taskId => ({
  type: tasksActionTypes.FETCH,
  payload: { taskId },
  meta: { schema: { task: taskSchema } },
});

const watchFetchRequest = takeEveryApiCall(tasksActionTypes.FETCH, tasksApi.fetch);

export const submitTask = (taskId, form, rules) => ({
  type: tasksActionTypes.SUBMIT,
  payload: { taskId, form, response: JSON.stringify(form) },
  meta: {
    schema: { assignments: [assignmentSchema] },
    validation: { form: rules },
  },
});

const watchCreateRequest = takeEveryApiCall(tasksActionTypes.SUBMIT, tasksApi.submitTask);


export function* tasksSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchCreateRequest);
}
