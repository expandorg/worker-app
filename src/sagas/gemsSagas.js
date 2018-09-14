import {
  fork,
  takeEvery,
  put,
  select,
  call,
  getContext,
} from 'redux-saga/effects';

import { takeEveryApiCall, RequestStates } from '@gemsorg/app-utils';

import { gemsActionTypes } from './actionTypes';

import { userApi } from '../api/UserApi';
import { etheriumApi } from '../api/EthgasstationInfoApi';

import { userSelector } from '../selectors/userSelectors';
import { initGemsStateSelector } from '../selectors/uiStateSelectors';

import { ua, GtmActions } from '../common/GtmEvents';

export const depositGems = deposit => ({
  type: gemsActionTypes.DEPOSIT,
  payload: { deposit },
  meta: {
    track: { action: ua(GtmActions.Deposit, deposit) },
  },
});

function* handleDeposit({ payload: { deposit } }) {
  try {
    // approve depost tx
    const initGemsState = yield select(initGemsStateSelector);
    if (initGemsState.state === RequestStates.Fetched) {
      const services = yield getContext('services');
      const gemsService = services.resolve('gems');

      const average = yield call(etheriumApi.getAverage);

      yield call(gemsService.approve, deposit, average);

      yield put({ type: gemsActionTypes.DEPOSIT_STAGE, payload: 2 });
      const user = yield select(userSelector);

      const payload = yield call(userApi.deposit, { deposit, userId: user.id });
      yield put({
        type: gemsActionTypes.DEPOSIT_COMPLETE,
        payload,
        meta: {
          track: { action: ua(GtmActions.DepositSuccess, deposit) },
        },
      });
    } else if (initGemsState.error) {
      throw new Error('Your ethereum address is no longer active in Metamask');
    } else {
      throw new Error('Metamask is not avaiable');
    }
  } catch (error) {
    yield put({
      type: gemsActionTypes.DEPOSIT_FAILED,
      payload: error,
      meta: {
        track: { action: GtmActions.DepositFailed },
      },
    });
  }
}

export const fetchGemsBalance = user => ({
  type: gemsActionTypes.FETCH_BALANCE,
  payload: { userId: user.id },
});

const watchFetchBalance = takeEveryApiCall(
  gemsActionTypes.FETCH_BALANCE,
  userApi.fetchBalance
);

export const withdrawPayments = (user, withdrawal) => ({
  type: gemsActionTypes.WITHDRAW,
  payload: { userId: user.id, withdrawal },
  meta: {
    track: {
      action: ua(GtmActions.Withdraw, withdrawal),
      complete: ua(GtmActions.WithdrawSuccess, withdrawal),
      failed: GtmActions.WithdrawFailed,
    },
  },
});

export const transactionFailed = (data, params) => ({
  type: gemsActionTypes.TRANSACTION_FAILED,
  payload: { data, params },
});

const watchWithdraw = takeEveryApiCall(
  gemsActionTypes.WITHDRAW,
  userApi.withdraw
);

export function* gemsSagas() {
  yield takeEvery(gemsActionTypes.DEPOSIT, handleDeposit);

  yield fork(watchFetchBalance);
  yield fork(watchWithdraw);
}
