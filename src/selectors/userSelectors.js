// @flow
import { createSelector } from 'reselect';

export const userSelector = (state: Object) => state.user;

export const loggedInSelector = createSelector(userSelector, user => !!user);

export const gemBalanceSelector = (state: Object) => state.gemsBalance;

export const transactionsSelector = (state: Object) => state.transactions;
