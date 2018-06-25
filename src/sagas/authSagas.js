import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { authActionTypes, appActionTypes } from './actionTypes';
import { takeEveryApiCall } from '../common/app/apiCallSaga';

import { gemsService } from '../services/GemsService';

import { authApi } from '../api/AuthApi';

import { loginValidation, signupValidation } from '../model/user';
import { GTMEvents } from '../model/enums';

import { userSelector } from '../selectors/userSelectors';

import { authResponseSchema } from '../model/schemas';

export const getCurrentUser = () => ({
  type: authActionTypes.GET_CURRENT,
  payload: {},
  meta: { schema: authResponseSchema },
});

const watchGetCurrent = takeEveryApiCall(authActionTypes.GET_CURRENT, authApi.getCurrentUser);


export const login = (email, password) => ({
  type: authActionTypes.LOGIN,
  payload: { email, password },
  meta: {
    validation: loginValidation,
    schema: authResponseSchema,
    track: {
      action: GTMEvents.login,
    },
  },
});

const watchLogin = takeEveryApiCall(authActionTypes.LOGIN, authApi.loginUser);


export const signup = form => ({
  type: authActionTypes.SIGNUP,
  payload: form,
  meta: {
    validation: signupValidation,
    schema: authResponseSchema,
    track: {
      action: GTMEvents.signup,
    },
  },
});

const watchSignup = takeEveryApiCall(authActionTypes.SIGNUP, authApi.signupUser);

export const logout = () => ({
  type: authActionTypes.LOGOUT,
  payload: null,
});

const watchLogout = takeEveryApiCall(authActionTypes.LOGOUT, authApi.logout);


export const loginMetamask = () => ({
  type: authActionTypes.LOGIN_METAMASK,
  payload: null,
});

function* handleLoginMetamask() {
  try {
    const address = gemsService.getDefaultAccount();
    const { result: signature } = yield call(gemsService.getAccountSingature, address);
    const data = yield call(authApi.loginMetamask, { address, signature });
    const payload = normalize(data, authResponseSchema);
    yield put(({ type: authActionTypes.LOGIN_METAMASK_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: authActionTypes.LOGIN_METAMASK_FAILED, payload: error }));
  }
}


export const signupMetamask = () => ({
  type: authActionTypes.SIGNUP_METAMASK,
  payload: null,
});

function* handleSignupMetamask() {
  try {
    const address = gemsService.getDefaultAccount();
    const { result: signature } = yield call(gemsService.getAccountSingature, address);
    const data = yield call(authApi.signupMetamask, { address, signature });
    const payload = normalize(data, authResponseSchema);
    yield put(({ type: authActionTypes.SIGNUP_METAMASK_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: authActionTypes.SIGNUP_METAMASK_FAILED, payload: error }));
  }
}


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
  yield takeEvery(authActionTypes.SIGNUP_METAMASK, handleSignupMetamask);

  yield fork(watchAppInit);
  yield fork(watchGetCurrent);
  yield fork(watchLogin);
  yield fork(watchSignup);
  yield fork(watchLogout);
}
