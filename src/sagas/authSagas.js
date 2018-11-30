import { fork, takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { authActionTypes } from '@gemsorg/app-auth';

import {
  watchAppInit,
  handleLoginMetamask,
  handleSignupMetamask,
} from '@gemsorg/app-auth/sagas';

/* eslint-disable import/prefer-default-export */

export function* authSagas() {
  const actions = [
    authActionTypes.GET_CURRENT,
    authActionTypes.LOGIN,
    authActionTypes.SIGNUP,
    authActionTypes.LOGOUT,
  ];
  yield takeEvery(actions, handleAsyncCall);

  yield takeEvery(authActionTypes.LOGIN_METAMASK, handleLoginMetamask);
  yield takeEvery(authActionTypes.SIGNUP_METAMASK, handleSignupMetamask);

  yield fork(watchAppInit);
}
