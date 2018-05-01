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
