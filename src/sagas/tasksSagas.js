import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { tasksActionTypes } from '../actions/action-types';

import { tasksApi } from '../api/TasksApi';

export const submitTask = payload => ({
  type: tasksActionTypes.CREATE,
  payload,
});

const watchCreateRequest = takeEveryApiCall(tasksActionTypes.CREATE, tasksApi.submitTask);

export function* tasksSagas() {
  yield fork(watchCreateRequest);
}
