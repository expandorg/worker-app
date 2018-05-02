import { fork, takeEvery, put, call } from 'redux-saga/effects';
import { takeEveryApiCall } from '../common/app/apiCallSaga';

import { gemsActionTypes } from '../actions/action-types';

import { gemsApi } from '../api/GemsApi';
import { gemsService } from '../services/GemsService';

const setDepositStage = () => ({
  type: gemsActionTypes.DEPOSIT_STAGE,
  payload: null,
});

export const depositGems = value => ({
  type: gemsActionTypes.DEPOSIT,
  payload: { value },
});

function* handleDeposit({ payload }) {
  try {
    yield call(gemsService.approve, payload);
    yield put(setDepositStage(2));
    const result = yield call(gemsApi.deposit, payload);
    yield put({ type: gemsActionTypes.DEPOSIT_COMPLETE, payload: result });
  } catch (error) {
    yield put({ type: gemsActionTypes.DEPOSIT_FAILED, payload: error });
  }
}

function* watchDeposit() {
  yield takeEvery(gemsActionTypes.DEPOSIT, handleDeposit);
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
  yield fork(watchDeposit);
  yield fork(watchFetchBalance);
  yield fork(watchWithdraw);
}
