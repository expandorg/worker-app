import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';

export const fetchJobs = () => ({
  type: jobsActionTypes.FETCH,
  payload: null,
});

const watchFetchRequest = takeEveryApiCall(jobsActionTypes.FETCH, jobsApi.fetch);

export function* jobsSagas() {
  yield fork(watchFetchRequest);
}
