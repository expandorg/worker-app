import { createSelector } from 'reselect';

import { userBalance } from '../model/balance';

export const userSelector = state => state.user;

export const loggedInSelector = createSelector(
  userSelector,
  user => !!user,
);

export const isFundedSelector = createSelector(
  userSelector,
  user => (user ? userBalance.isFunded(user) : false),
);


export const gemBalanceSelector = state => state.gemsBalance;

export const transactionsSelector = state => state.transactions;
