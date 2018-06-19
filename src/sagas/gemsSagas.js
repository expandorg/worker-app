import { fork, takeEvery, put, select, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { takeEveryApiCall } from '../common/app/apiCallSaga';

import { gemsActionTypes } from './actionTypes';

import { userApi } from '../api/UserApi';
import { gemsService } from '../services/GemsService';

import { userSelector } from '../selectors/userSelectors';

import { authResponseSchema } from '../model/schemas';

export const depositGems = deposit => ({
  type: gemsActionTypes.DEPOSIT,
  payload: { deposit },
});

function* handleDeposit({ payload: { deposit } }) {
  try {
    // approve depost tx
    yield call(gemsService.approve, deposit);

    yield put({ type: gemsActionTypes.DEPOSIT_STAGE, payload: 2 });
    const user = yield select(userSelector);

    const data = yield call(userApi.deposit, { deposit, userId: user.id });
    const payload = normalize(data, authResponseSchema);
    yield put({ type: gemsActionTypes.DEPOSIT_COMPLETE, payload });
  } catch (error) {
    yield put({ type: gemsActionTypes.DEPOSIT_FAILED, payload: error });
  }
}

export const fetchGemsBalance = user => ({
  type: gemsActionTypes.FETCH_BALANCE,
  payload: { userId: user.id },
});

const watchFetchBalance = takeEveryApiCall(gemsActionTypes.FETCH_BALANCE, userApi.fetchBalance);

export const withdrawPayments = (user, withdrawal) => ({
  type: gemsActionTypes.WITHDRAW,
  payload: { userId: user.id, withdrawal },
  meta: { schema: authResponseSchema },
});

const watchWithdraw = takeEveryApiCall(gemsActionTypes.WITHDRAW, userApi.withdraw);

export function* gemsSagas() {
  yield takeEvery(gemsActionTypes.DEPOSIT, handleDeposit);
  yield fork(watchFetchBalance);
  yield fork(watchWithdraw);
}
