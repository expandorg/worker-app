import { createSelector } from 'reselect';

import { isFunded } from '../model/worker';

export const userSelector = state => state.user;

export const loggedInSelector = createSelector(
  userSelector,
  user => !!user,
);

export const statsSelector = state => state.stats;

export const isFundedSelector = createSelector(
  userSelector,
  statsSelector,
  (user, stats) => (user ? isFunded(user, stats) : false),
);

export const isJoinedSelector = state => state.isJoined;


export const gemBalanceSelector = state => state.gemsBalance;

export const transactionsSelector = state => state.transactions;
