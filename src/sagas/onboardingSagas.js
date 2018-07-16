import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { onboardingActionTypes } from './actionTypes';

import { onboardingSchema } from '../model/schemas';

import { onboardingApi } from '../api/OnboardingApi';

export const fetchOnboarding = jobId => ({
  type: onboardingActionTypes.FETCH,
  payload: { jobId },
  meta: { schema: { onboarding: onboardingSchema } },
});

const watchFetchRequest = takeEveryApiCall(onboardingActionTypes.FETCH, onboardingApi.fetch);


export const submitOnboarding = (jobId, pageId, form) => ({
  type: onboardingActionTypes.SUBMIT,
  payload: { jobId, pageId, response: JSON.stringify(form) },
  meta: {
    schema: { onboarding: onboardingSchema },
  },
});

const watchSubmitRequest = takeEveryApiCall(onboardingActionTypes.SUBMIT, onboardingApi.submit);


export function* onboardingSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchSubmitRequest);
}
