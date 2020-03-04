import { takeEvery, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { authResponseSchema } from '@expandorg/app-auth';

import { responsesActionTypes, jobsActionTypes } from './actionTypes';

import { jobSchema } from '../model/schemas';

import { responsesApi } from '../api/ResponsesApi';
import { jobsApi } from '../api/JobsApi';

export const verifyResponse = (responseId, score, reason) => ({
  type: responsesActionTypes.VERIFY,
  payload: { responseId, score, reason },
});

function* handleVerifyResponse({ payload, meta }) {
  try {
    const verified = yield call(responsesApi.verify, payload);
    try {
      const jobs = yield call(jobsApi.list);
      yield put({
        type: jobsActionTypes.FETCH_LIST_COMPLETE,
        payload: normalize(jobs, { jobs: [jobSchema] }),
      });
    } catch (e) {
      yield put({ type: jobsActionTypes.FETCH_LIST_FAILED, payload: e });
    }
    yield put({
      type: responsesActionTypes.VERIFY_COMPLETE,
      payload: normalize(verified, authResponseSchema),
      complete: true,
      meta,
    });
  } catch (error) {
    yield put({
      type: responsesActionTypes.VERIFY_FAILED,
      payload: error,
      failed: true,
      meta,
    });
  }
}

export function* responsesSagas() {
  yield takeEvery(responsesActionTypes.VERIFY, handleVerifyResponse);
}
