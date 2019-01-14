import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { authResponseSchema } from '@expandorg/app-auth';
import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';
import { jobSchema } from '../model/schemas';
import { GtmActions } from '../common/GtmEvents';

export const fetchJobs = () => ({
  type: jobsActionTypes.FETCH_LIST,
  payload: null,
  asyncCall: jobsApi.list,
  meta: { schema: { jobs: [jobSchema] } },
});

export const fetchJob = jobId => ({
  type: jobsActionTypes.FETCH,
  payload: { jobId },
  asyncCall: jobsApi.fetch,
  meta: { schema: { job: jobSchema } },
});

export const assignJob = jobId => ({
  type: jobsActionTypes.ASSIGN,
  payload: { jobId },
  asyncCall: jobsApi.assign,
  meta: {
    schema: authResponseSchema,
    track: {
      action: GtmActions.JobAssign,
    },
  },
});

export function* jobsSagas() {
  yield takeEvery(
    [jobsActionTypes.FETCH, jobsActionTypes.FETCH_LIST, jobsActionTypes.ASSIGN],
    handleAsyncCall
  );
}
