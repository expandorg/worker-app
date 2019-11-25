import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { profileApi } from '../api/ProfileApi';

import { transactionActionTypes } from './actionTypes';

export const fetchTransactions = cursor => ({
  type: transactionActionTypes.FETCH_LIST,
  payload: { cursor },
  asyncCall: profileApi.transactionHistory,
  meta: { params: { cursor } },
});

export function* transactionsSagas() {
  yield takeEvery(transactionActionTypes.FETCH_LIST, handleAsyncCall);
}
