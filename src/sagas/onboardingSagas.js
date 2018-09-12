import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { onboardingActionTypes } from './actionTypes';

import { onboardingSchema, authResponseSchema } from '../model/schemas';

import { onboardingApi } from '../api/OnboardingApi';

export const fetchOnboarding = jobId => ({
  type: onboardingActionTypes.FETCH,
  payload: { jobId },
  meta: { schema: { onboarding: onboardingSchema } },
});

const watchFetchRequest = takeEveryApiCall(
  onboardingActionTypes.FETCH,
  onboardingApi.fetch
);

export const submitOnboarding = (jobId, response) => ({
  type: onboardingActionTypes.SUBMIT,
  payload: { jobId, response },
  meta: {
    schema: { onboarding: onboardingSchema },
  },
});

const watchSubmitRequest = takeEveryApiCall(
  onboardingActionTypes.SUBMIT,
  onboardingApi.submit
);

export const reportOnboarding = (jobId, reason, message) => ({
  type: onboardingActionTypes.REPORT,
  payload: { jobId, reason, message },
  meta: {
    schema: authResponseSchema,
  },
});

const watchReportRequest = takeEveryApiCall(
  onboardingActionTypes.REPORT,
  onboardingApi.report
);

export const removeOnboardingMessage = jobId => ({
  type: onboardingActionTypes.REMOVE_MESSAGE,
  payload: { jobId },
});

export function* onboardingSagas() {
  yield fork(watchFetchRequest);
  yield fork(watchSubmitRequest);
  yield fork(watchReportRequest);
}
