import { createSelector } from 'reselect';

export const userStateSelector = state => state.user;

export const isAuthorizedSelector = createSelector(
  userStateSelector,
  user => user.isAuthorized,
);

export const isJoinedSelector = createSelector(
  userStateSelector,
  user => user.isJoined,
);

export const statsSelector = state => state.stats;

export const workerSelector = state => state.worker;

export const balanceSelector = state => state.gemsBalance;

export const transactionsSelector = state => state.transactions;
