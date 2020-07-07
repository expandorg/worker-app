import { takeEvery, getContext } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { authResponseSchema } from '@expandorg/app-auth';
import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';
import { jobSchema, jobPreviewSchema } from '../model/schemas';
import { GtmActions } from '../common/GtmEvents';

export const fetchJobs = () => ({
  type: jobsActionTypes.FETCH_LIST,
  payload: null,
  asyncCall: jobsApi.list,
  meta: { schema: { jobs: [jobSchema] } },
});

export const fetchJob = (jobId) => ({
  type: jobsActionTypes.FETCH,
  payload: { jobId },
  asyncCall: jobsApi.fetch,
  meta: { schema: jobSchema },
});

export const assignTask = (jobId, redirect = 'push') => ({
  type: jobsActionTypes.ASSIGN_TASK,
  payload: { jobId },
  asyncCall: jobsApi.assign,
  meta: {
    schema: authResponseSchema,
    track: {
      action: GtmActions.JobAssign,
    },
    redirect,
  },
});

export const assignVerification = (jobId, redirect = 'push') => ({
  type: jobsActionTypes.ASSIGN_VERIFICATION,
  payload: { jobId },
  asyncCall: jobsApi.assignVerification,
  meta: {
    schema: authResponseSchema,
    track: {
      action: GtmActions.JobAssign,
    },
    redirect,
  },
});

export const fetchJobPreview = (jobId) => ({
  type: jobsActionTypes.FETCH_PREVIEW,
  payload: { jobId },
  asyncCall: jobsApi.fetchPreview,
  meta: { schema: { job: jobPreviewSchema }, params: { jobId } },
});

function* handleRedirect(url, redirect) {
  const services = yield getContext('services');
  const history = services.resolve('history');
  switch (redirect) {
    case 'push': {
      history.push(url);
      break;
    }
    case 'replace': {
      history.replace(url);
      break;
    }
    default:
      break;
  }
}

function* handleTaskAssigned({ payload, meta }) {
  const url = `/tasks/${payload.result.newAssignment.id}`;
  yield handleRedirect(url, meta.redirect);
}
function* handleVerificationAssigned({ payload, meta }) {
  const url = `/verification/${payload.result.newAssignment.id}`;
  yield handleRedirect(url, meta.redirect);
}

export function* jobsSagas() {
  yield takeEvery(
    [
      jobsActionTypes.FETCH,
      jobsActionTypes.FETCH_LIST,
      jobsActionTypes.ASSIGN_TASK,
      jobsActionTypes.ASSIGN_VERIFICATION,
      jobsActionTypes.FETCH_PREVIEW,
    ],
    handleAsyncCall
  );

  yield takeEvery(jobsActionTypes.ASSIGN_TASK_COMPLETE, handleTaskAssigned);
  yield takeEvery(
    jobsActionTypes.ASSIGN_VERIFICATION_COMPLETE,
    handleVerificationAssigned
  );
}
