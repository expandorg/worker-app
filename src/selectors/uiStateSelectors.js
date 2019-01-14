import { createSelector } from 'reselect';
import { uiStateSelector } from '@expandorg/app-utils/app';

export const assignJobStateSelector = createSelector(
  uiStateSelector,
  state => state.assignJob
);

export const submitOnboardingStateSelector = createSelector(
  uiStateSelector,
  state => state.submitOnboarding
);

export const reportOnboardingStateSelector = createSelector(
  uiStateSelector,
  state => state.reportOnboarding
);

export const submitTaskStateSelector = createSelector(
  uiStateSelector,
  state => state.submitTask
);

export const reportAssignmentStateSelector = createSelector(
  uiStateSelector,
  state => state.reportAssignment
);

export const cancelAssignmentStateSelector = createSelector(
  uiStateSelector,
  state => state.cancelAssignment
);

export const verifyResponseStateSelector = createSelector(
  uiStateSelector,
  state => state.verifyResponse
);

export const notificationSelector = createSelector(
  uiStateSelector,
  state => state.notification
);
