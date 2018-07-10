// @flow
import { createSelector } from 'reselect';

export const uiStateSelector = (state: Object) => state.ui;

export const initGemsStateSelector = createSelector(uiStateSelector, state => state.initGems);


export const authStateSelector = createSelector(uiStateSelector, state => state.auth);
export const loginStateSelector = createSelector(uiStateSelector, state => state.login);
export const signupStateSelector = createSelector(uiStateSelector, state => state.signup);

export const loginMetamaskStateSelector = createSelector(
  uiStateSelector,
  state => state.loginMetamask,
);

export const signupMetamaskStateSelector = createSelector(
  uiStateSelector,
  state => state.signupMetamask,
);


export const assignAddressStateSelector = createSelector(
  uiStateSelector,
  state => state.assignAddress,
);

export const editEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.editEmail,
);

export const confirmEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.confirmEmail,
);


export const resendConfirmEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.resendConfirmEmail,
);

export const changePasswordStateSelector = createSelector(
  uiStateSelector,
  state => state.changePassword,
);

export const resetPasswordStateSelector = createSelector(
  uiStateSelector,
  state => state.resetPassword,
);

export const restorePasswordStateSelector = createSelector(
  uiStateSelector,
  state => state.restorePassword,
);

export const assignJobStateSelector = createSelector(uiStateSelector, state => state.assignJob);

export const submitTaskStateSelector = createSelector(uiStateSelector, state => state.submitTask);


export const fetchBalanceStateSelector = createSelector(uiStateSelector, state => state.gemBalance);

export const depositStateSelector = createSelector(uiStateSelector, state => state.deposit);

export const depositStageSelector = createSelector(uiStateSelector, state => state.depositStage);

export const withdrawStateSelector = createSelector(uiStateSelector, state => state.withdraw);

export const notificationSelector = createSelector(uiStateSelector, state => state.notification);
