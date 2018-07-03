import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';
import { jobSchema, authResponseSchema } from '../model/schemas';
import { GtmActions } from '../common/gtm/GtmEvents';

export const fetchJobs = () => ({
  type: jobsActionTypes.FETCH_LIST,
  payload: null,
  meta: { schema: { jobs: [jobSchema] } },
});

const watchFetchListRequest = takeEveryApiCall(jobsActionTypes.FETCH_LIST, jobsApi.list);


export const fetchJob = jobId => ({
  type: jobsActionTypes.FETCH,
  payload: { jobId },
  meta: { schema: { job: jobSchema } },
});

const watchFetchRequest = takeEveryApiCall(jobsActionTypes.FETCH, jobsApi.fetch);


export const assignJob = jobId => ({
  type: jobsActionTypes.ASSIGN,
  payload: { jobId },
  meta: {
    schema: authResponseSchema,
    track: {
      action: GtmActions.JobAssign,
    },
  },
});

const watchAssignRequest = takeEveryApiCall(jobsActionTypes.ASSIGN, jobsApi.assign);


export function* jobsSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchFetchListRequest);
  yield fork(watchAssignRequest);
}
