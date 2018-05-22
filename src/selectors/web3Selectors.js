import { createSelector } from 'reselect';

export const web3StateSelector = state => state.web3;

export const metamaskStateSelector = createSelector(
  web3StateSelector,
  state => state.metamask,
);
