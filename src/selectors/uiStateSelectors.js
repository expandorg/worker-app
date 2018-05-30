import { createSelector } from 'reselect';

import { RequestStates } from '../common/app/requestUiState';

export const uiStateSelector = state => state.ui;


export const authStateSelector = createSelector(uiStateSelector, state => state.auth);

export const loginStateSelector = createSelector(uiStateSelector, state => state.login);

export const signupStateSelector = createSelector(uiStateSelector, state => state.signup);

export const assignAddressStateSelector = createSelector(
  uiStateSelector,
  state => state.assignAddress,
);

export const assignJobStateSelector = createSelector(uiStateSelector, state => state.assignJob);

export const createTaskStateSelector = createSelector(uiStateSelector, state => state.createTask);

export const taskIsSubmittingSelector = createSelector(
  createTaskStateSelector,
  state => state.state === RequestStates.Fetching,
);

export const errorSelector = createSelector(uiStateSelector, state => state.errors);

export const depositStageSelector = createSelector(uiStateSelector, state => state.depositStage);

export const depositGemsStateSelector = createSelector(uiStateSelector, state => state.depositGems);

export const withdrawStateSelector = createSelector(uiStateSelector, state => state.withdraw);
