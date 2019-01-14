import { createSelector } from 'reselect';

export const uiStateSelector = state => state.ui;

export const assignAddressStateSelector = createSelector(
  uiStateSelector,
  state => state.assignAddress
);

export const editEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.editEmail
);

export const confirmEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.confirmEmail
);

export const resendConfirmEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.resendConfirmEmail
);

export const changePasswordStateSelector = createSelector(
  uiStateSelector,
  state => state.changePassword
);

export const resetPasswordStateSelector = createSelector(
  uiStateSelector,
  state => state.resetPassword
);

export const restorePasswordStateSelector = createSelector(
  uiStateSelector,
  state => state.restorePassword
);

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
