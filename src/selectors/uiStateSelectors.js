import { createSelector } from 'reselect';

export const uiStateSelector = state => state.ui;


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

export const assignJobStateSelector = createSelector(uiStateSelector, state => state.assignJob);

export const createTaskStateSelector = createSelector(uiStateSelector, state => state.createTask);

export const depositStageSelector = createSelector(uiStateSelector, state => state.depositStage);

export const depositGemsStateSelector = createSelector(uiStateSelector, state => state.depositGems);

export const withdrawStateSelector = createSelector(uiStateSelector, state => state.withdraw);
