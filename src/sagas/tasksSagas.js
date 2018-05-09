import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { tasksActionTypes } from './actionTypes';

import { tasksApi } from '../api/TasksApi';

export const submitTask = submission => ({
  type: tasksActionTypes.CREATE,
  payload: { submission },
});

const watchCreateRequest = takeEveryApiCall(tasksActionTypes.CREATE, tasksApi.submitTask);

export const setIsJoined = payload => ({
  type: tasksActionTypes.JOIN,
  payload,
});


export function* tasksSagas() {
  yield fork(watchCreateRequest);
}
