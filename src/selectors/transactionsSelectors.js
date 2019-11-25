// @flow
import { createSelector } from 'reselect';

export const transactionsListSelector = (state: Object) =>
  state.transactions.list;

export const transactionsSelector: any = createSelector(
  transactionsListSelector,
  list => list
);
