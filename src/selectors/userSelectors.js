import { createSelector } from 'reselect';

import { isFunded } from '../model/worker';

export const userSelector = state => state.user;

export const loggedInSelector = createSelector(
  userSelector,
  user => !!user,
);

export const isFundedSelector = createSelector(
  userSelector,
  user => (user ? isFunded(user) : false),
);


export const isJoinedSelector = () => false;


export const gemBalanceSelector = state => state.gemsBalance;

export const transactionsSelector = state => state.transactions;
