import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';
import { jobSchema } from '../model/schemas';

export const fetchJobs = () => ({
  type: jobsActionTypes.FETCH,
  payload: null,
  meta: { schema: [jobSchema] },
});

const watchFetchRequest = takeEveryApiCall(jobsActionTypes.FETCH, jobsApi.fetch);


export const assignJob = jobId => ({
  type: jobsActionTypes.ASSIGN,
  payload: { jobId },
});

const watchAssignRequest = takeEveryApiCall(jobsActionTypes.ASSIGN, jobsApi.assign);


export function* jobsSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchAssignRequest);
}
