import { fork, takeEvery, put, call } from 'redux-saga/effects';
import { takeEveryApiCall } from '../common/app/apiCallSaga';

import { gemsActionTypes } from './actionTypes';

import { gemsApi } from '../api/GemsApi';
import { gemsService } from '../services/GemsService';


export const setTransactions = payload => ({
  type: gemsActionTypes.SET_TRANSACTIONS,
  payload,
});


export const depositGems = value => ({
  type: gemsActionTypes.DEPOSIT,
  payload: { value },
});

function* handleDeposit({ payload }) {
  try {
    // approve depost tx
    yield call(gemsService.approve, payload);

    yield put({ type: gemsActionTypes.DEPOSIT_STAGE, payload: 2 });

    const result = yield call(gemsApi.deposit, payload);
    yield put({ type: gemsActionTypes.DEPOSIT_COMPLETE, payload: result });
  } catch (error) {
    yield put({ type: gemsActionTypes.DEPOSIT_FAILED, payload: error });
  }
}

export const fetchWorkerGemsBalance = () => ({
  type: gemsActionTypes.FETCH_BALANCE,
  payload: null,
});

const watchFetchBalance = takeEveryApiCall(gemsActionTypes.FETCH_BALANCE, gemsApi.fetchBalance);

export const withdrawPayments = () => ({
  type: gemsActionTypes.WITHDRAW,
  payload: null,
});

const watchWithdraw = takeEveryApiCall(gemsActionTypes.WITHDRAW, gemsApi.withdraw);

export function* gemsSagas() {
  yield takeEvery(gemsActionTypes.DEPOSIT, handleDeposit);
  yield fork(watchFetchBalance);
  yield fork(watchWithdraw);
}
