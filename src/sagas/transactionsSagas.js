import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { transactionsApi } from '../api/TransactionsApi';

import { transactionActionTypes } from './actionTypes';

export const fetchTransactions = page => ({
  type: transactionActionTypes.FETCH_LIST,
  payload: { page },
  asyncCall: transactionsApi.fetchList,
  meta: { params: { page } },
});

export function* transactionsSagas() {
  yield takeEvery(transactionActionTypes.FETCH_LIST, handleAsyncCall);
}
