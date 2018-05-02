import { fork, call, put, takeEvery } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { userActionTypes } from './actionTypes';

import { userApi } from '../api/UserApi';
import { gemsService } from '../services/GemsService';

import settings from '../common/settings';

export const login = () => ({
  type: userActionTypes.LOGIN,
  payload: null,
});

function* handleLogin() {
  try {
    const address = gemsService.getDefaultAccount();

    const { result } = yield call(gemsService.getAccountSingature, address);
    const payload = yield call(userApi.login, { address, signature: result });

    yield put(({ type: userActionTypes.LOGIN_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: userActionTypes.LOGIN_FAILED, payload: error }));
  }
}


export const logout = () => ({
  type: userActionTypes.LOGOUT,
  payload: null,
});

function* handleLogout() {
  document.cookie = `JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${settings.cookieDomain}; path=/;`;
  yield put(({ type: userActionTypes.LOGOUT_COMPLETE, payload: null }));
}


export const fetchAuth = () => ({
  type: userActionTypes.AUTHORIZE,
  payload: null,
});

function* handleAuthorize() {
  try {
    const payload = yield call(userApi.authorize);

    // verify that worked id correspond to metamask account
    yield call(gemsService.verifyAccount, payload.worker.id);
    yield put(({ type: userActionTypes.AUTHORIZE_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: userActionTypes.AUTHORIZE_FAILED, payload: error }));
  }
}


export const setEmail = email => ({
  type: userActionTypes.SET_EMAIL,
  payload: { email },
});

const watchSetEmail = takeEveryApiCall(userActionTypes.SET_EMAIL, userApi.setEmail);

export const confirmEmail = code => ({
  type: userActionTypes.CONFIRM_EMAIL,
  payload: { code },
});

const watchConfirmEmail = takeEveryApiCall(userActionTypes.CONFIRM_EMAIL, userApi.confirmEmail);


export const resendConfirmEmail = () => ({
  type: userActionTypes.RESEND_CONFIRM_EMAIL,
  payload: null,
});

const watchResendConfirm = takeEveryApiCall(
  userActionTypes.RESEND_CONFIRM_EMAIL,
  userApi.resendConfirmEmail,
);

export function* userSagas() {
  yield takeEvery(userActionTypes.LOGIN, handleLogin);
  yield takeEvery(userActionTypes.LOGOUT, handleLogout);

  yield takeEvery(userActionTypes.AUTHORIZE, handleAuthorize);

  // logout when authorisation falied
  yield takeEvery(userActionTypes.AUTHORIZE_FAILED, handleLogout);

  yield fork(watchSetEmail);
  yield fork(watchConfirmEmail);
  yield fork(watchResendConfirm);
}
