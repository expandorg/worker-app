import { takeEvery, put, call } from 'redux-saga/effects';
import { appActionTypes } from './actionTypes';

import { gemsService } from '../services/GemsService';

export const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const clearErrors = payload => ({
  type: appActionTypes.CLEAR_ERRORS,
  payload,
});


export const init = () => ({
  type: appActionTypes.INIT_WEB3,
  payload: null,
});


function* handleInitWeb3() {
  try {
    yield call(gemsService.initWeb3);
    yield put({ type: appActionTypes.INIT_WEB3_COMPLETE, payload: null });
  } catch (error) {
    yield put({ type: appActionTypes.INIT_WEB3_FAILED, payload: error });
  }
}

function* initGemsInstance() {
  try {
    yield put({ type: appActionTypes.INIT_GEMS, payload: null });
    while (true) {
      if (gemsService.getDefaultAccount()) {
        break;
      }
      yield call(delay, 300);
    }
    gemsService.initGemTokens();
    yield put({ type: appActionTypes.INIT_GEMS_COMPLETE, payload: null });
  } catch (e) {
    yield put({ type: appActionTypes.INIT_GEMS_FAILED, payload: null });
  }
}


export function* appSagas() {
  yield takeEvery(appActionTypes.INIT_WEB3, handleInitWeb3);
  yield takeEvery(appActionTypes.INIT_WEB3_COMPLETE, initGemsInstance);
}
