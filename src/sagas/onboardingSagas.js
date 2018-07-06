import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { onboardingActionTypes } from './actionTypes';

import { onboardingStatusSchema } from '../model/schemas';

import { onboardingApi } from '../api/OnboardingApi';

export const fetchOnboardingStatus = jobId => ({
  type: onboardingActionTypes.FETCH,
  payload: { jobId },
  meta: { schema: { onboardingStatus: onboardingStatusSchema } },
});

const watchFetchRequest = takeEveryApiCall(onboardingActionTypes.FETCH, onboardingApi.fetchStatus);


export const submitOnboarding = (jobId, stepId, form) => ({
  type: onboardingActionTypes.SUBMIT,
  payload: { jobId, stepId, response: JSON.stringify(form) },
  meta: {
    schema: { onboardingStatus: onboardingStatusSchema },
  },
});

const watchSubmitRequest = takeEveryApiCall(onboardingActionTypes.SUBMIT, onboardingApi.submitStep);


export function* onboardingSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchSubmitRequest);
}
