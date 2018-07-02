import { fork, takeEvery, put, select, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { takeEveryApiCall } from '../common/app/apiCallSaga';

import { gemsActionTypes } from './actionTypes';

import { userApi } from '../api/UserApi';
import { gemsService } from '../services/GemsService';

import { RequestStates } from '../common/app/requestUiState';

import { userSelector } from '../selectors/userSelectors';
import { initGemsStateSelector } from '../selectors/uiStateSelectors';

import { authResponseSchema } from '../model/schemas';
import { ua, GtmActions } from '../common/gtm/GtmEvents';

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
      yield call(gemsService.approve, deposit);

      yield put({ type: gemsActionTypes.DEPOSIT_STAGE, payload: 2 });
      const user = yield select(userSelector);

      const data = yield call(userApi.deposit, { deposit, userId: user.id });
      const payload = normalize(data, authResponseSchema);
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

const watchFetchBalance = takeEveryApiCall(gemsActionTypes.FETCH_BALANCE, userApi.fetchBalance);

export const withdrawPayments = (user, withdrawal) => ({
  type: gemsActionTypes.WITHDRAW,
  payload: { userId: user.id, withdrawal },
  meta: {
    schema: authResponseSchema,
    track: {
      action: ua(GtmActions.Withdraw, withdrawal),
      complete: ua(GtmActions.WithdrawSuccess, withdrawal),
      failed: GtmActions.WithdrawFailed,
    },
  },
});

const watchWithdraw = takeEveryApiCall(gemsActionTypes.WITHDRAW, userApi.withdraw);

export function* gemsSagas() {
  yield takeEvery(gemsActionTypes.DEPOSIT, handleDeposit);
  yield fork(watchFetchBalance);
  yield fork(watchWithdraw);
}
