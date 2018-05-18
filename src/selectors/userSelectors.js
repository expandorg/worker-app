import { createSelector } from 'reselect';

export const userSelector = state => state.user;

export const loggedInSelector = createSelector(
  userSelector,
  user => !!user,
);

export const isJoinedSelector = state => state.isJoined;

export const statsSelector = state => state.stats;

export const gemBalanceSelector = state => state.gemsBalance;

export const transactionsSelector = state => state.transactions;
