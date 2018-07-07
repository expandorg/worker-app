import { takeEvery, put, call } from 'redux-saga/effects';
import { appActionTypes, web3ActionTypes } from './actionTypes';

import { gemsService } from '../services/GemsService';

import { delay } from '../common/app/apiCallSaga';

function* handleInitWeb3() {
  try {
    yield call(gemsService.initWeb3);
    yield put({ type: web3ActionTypes.INIT_WEB3_COMPLETE, payload: null });
  } catch (error) {
    yield put({ type: web3ActionTypes.INIT_WEB3_FAILED, payload: error });
  }
}

function* initGemsInstance() {
  try {
    yield put({ type: web3ActionTypes.INIT_GEMS, payload: null });

    // await, while user login with metamask extension
    while (true) {
      if (gemsService.getDefaultAccount()) {
        break;
      }
      yield call(delay, 1000);
    }
    yield call(gemsService.initGemTokens);
    yield put({ type: web3ActionTypes.INIT_GEMS_COMPLETE, payload: null });
  } catch (e) {
    yield put({ type: web3ActionTypes.INIT_GEMS_FAILED, payload: e });
  }
}

/* eslint-disable import/prefer-default-export */
export function* web3Sagas() {
  yield takeEvery(appActionTypes.INIT, handleInitWeb3);
  yield takeEvery(web3ActionTypes.INIT_WEB3_COMPLETE, initGemsInstance);
}
