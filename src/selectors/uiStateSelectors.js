import { createSelector } from 'reselect';

import { RequestStates } from '../common/app/requestUiState';

export const uiStateSelector = state => state.ui;

export const createTaskStateSelector = createSelector(
  uiStateSelector,
  state => state.createTask,
);

export const taskIsSubmittingSelector = createSelector(
  createTaskStateSelector,
  state => state.state === RequestStates.Fetching,
);

export const errorSelector = (
  uiStateSelector,
  state => state.errors
);

export const depositStageSelector = createSelector(
  uiStateSelector,
  state => state.depositStage,
);

export const metamaskSelector = createSelector(
  uiStateSelector,
  state => state.metamask,
);

export const lockedSelector = createSelector(
  uiStateSelector,
  state => state.locked,
);

export const depositGemsStateSelector = createSelector(uiStateSelector, state => state.depositGems);

export const withdrawStateSelector = createSelector(uiStateSelector, state => state.withdraw);
