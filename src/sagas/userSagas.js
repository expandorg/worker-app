import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { userActionTypes } from '../actions/action-types';

import { userApi } from '../api/UserApi';

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
  yield fork(watchSetEmail);
  yield fork(watchConfirmEmail);
  yield fork(watchResendConfirm);
}
