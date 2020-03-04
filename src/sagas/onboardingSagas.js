import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';
import { authResponseSchema } from '@expandorg/app-auth';

import { onboardingActionTypes } from './actionTypes';

import { onboardingSchema } from '../model/schemas';

import { onboardingApi } from '../api/OnboardingApi';

export const fetchOnboarding = jobId => ({
  type: onboardingActionTypes.FETCH,
  payload: { jobId },
  asyncCall: onboardingApi.fetch,
  meta: { schema: { onboarding: onboardingSchema } },
});

export const submitOnboarding = (jobId, response) => ({
  type: onboardingActionTypes.SUBMIT,
  payload: { jobId, response },
  asyncCall: onboardingApi.submit,
  meta: {
    schema: { onboarding: onboardingSchema },
  },
});

export const reportOnboarding = (jobId, reason, message) => ({
  type: onboardingActionTypes.REPORT,
  payload: { jobId, reason, message },
  asyncCall: onboardingApi.report,
  meta: {
    schema: authResponseSchema,
  },
});

export const removeOnboardingMessage = jobId => ({
  type: onboardingActionTypes.REMOVE_MESSAGE,
  payload: { jobId },
});

export function* onboardingSagas() {
  yield takeEvery(
    [
      onboardingActionTypes.FETCH,
      onboardingActionTypes.SUBMIT,
      onboardingActionTypes.REPORT,
    ],
    handleAsyncCall
  );
}
