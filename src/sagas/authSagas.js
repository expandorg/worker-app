import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { authActionTypes, appActionTypes } from './actionTypes';
import { takeEveryApiCall } from '../common/app/apiCallSaga';

import { gemsService } from '../services/GemsService';

import { authApi } from '../api/AuthApi';

import { loginValidation, signupValidation } from '../model/user';

import { userSelector } from '../selectors/userSelectors';

export const getCurrentUser = () => ({
  type: authActionTypes.GET_CURRENT,
  payload: {},
});

const watchGetCurrent = takeEveryApiCall(authActionTypes.GET_CURRENT, authApi.getCurrentUser);


export const login = (email, password) => ({
  type: authActionTypes.LOGIN,
  payload: { email, password },
  meta: { validation: loginValidation },
});

const watchLogin = takeEveryApiCall(authActionTypes.LOGIN, authApi.loginUser);


export const loginMetamask = () => ({
  type: authActionTypes.LOGIN_METAMASK,
  payload: null,
});

function* handleLoginMetamask() {
  try {
    const address = gemsService.getDefaultAccount();
    const { result: signature } = yield call(gemsService.getAccountSingature, address);
    const payload = yield call(authApi.loginMetamask, { address, signature });

    yield put(({ type: authActionTypes.LOGIN_METAMASK_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: authActionTypes.LOGIN_METAMASK_FAILED, payload: error }));
  }
}

export const signupUser = form => ({
  type: authActionTypes.SIGNUP,
  payload: form,
  meta: { validation: signupValidation },
});

const watchSignup = takeEveryApiCall(authActionTypes.SIGNUP, authApi.signupUser);

export const logout = () => ({
  type: authActionTypes.LOGOUT,
  payload: null,
});


const watchLogout = takeEveryApiCall(authActionTypes.LOGOUT, authApi.logout);

function* watchAppInit() {
  yield takeEvery(appActionTypes.INIT, function* handleAuth() {
    const user = yield select(userSelector);
    if (!user) {
      yield put(getCurrentUser());
    }
  });
}

// yield takeEvery(userActionTypes.AUTHORIZE, handleAuthorize);
// function* handleAuthorize() {
//   try {
//     const payload = yield call(userApi.authorize);
//
//     // verify that worked id correspond to metamask account
//     yield call(gemsService.verifyAccount, payload.worker.id);
//     yield put(({ type: userActionTypes.AUTHORIZE_COMPLETE, payload }));
//   } catch (error) {
//     yield put(({ type: userActionTypes.AUTHORIZE_FAILED, payload: error }));
//   }
// }

export function* authSagas() {
  yield takeEvery(authActionTypes.LOGIN_METAMASK, handleLoginMetamask);

  yield fork(watchAppInit);
  yield fork(watchGetCurrent);
  yield fork(watchLogin);
  yield fork(watchSignup);
  yield fork(watchLogout);
}
