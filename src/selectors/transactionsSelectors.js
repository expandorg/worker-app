// @flow
import { createSelector } from 'reselect';

export const transactionsListSelector = (state: Object) =>
  state.transactions.list;

export const makeTransactionsSelector = (): any =>
  createSelector(
    transactionsListSelector,
    (state, page) => page,
    (list, page) => {
      if (!page) {
        return list;
      }
      return list;
    }
  );
