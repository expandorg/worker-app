import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';
import { jobSchema, taskSchema, assignmentSchema } from '../model/schemas';

export const fetchJobs = () => ({
  type: jobsActionTypes.FETCH,
  payload: null,
  meta: { schema: { jobs: [jobSchema] } },
});

const watchFetchRequest = takeEveryApiCall(jobsActionTypes.FETCH, jobsApi.fetch);


export const getJob = jobId => ({
  type: jobsActionTypes.GET,
  payload: { jobId },
  meta: { schema: jobSchema },
});

const watchgetRequest = takeEveryApiCall(jobsActionTypes.GET, jobsApi.getJob);

export const assignJob = jobId => ({
  type: jobsActionTypes.ASSIGN,
  payload: { jobId },
  meta: { schema: { task: taskSchema, assignments: [assignmentSchema] } },
});

const watchAssignRequest = takeEveryApiCall(jobsActionTypes.ASSIGN, jobsApi.assign);


export function* jobsSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchgetRequest);
  yield fork(watchAssignRequest);
}
