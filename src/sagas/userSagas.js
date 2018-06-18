import { takeEvery, fork, call, put } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { userActionTypes } from './actionTypes';

import { gemsService } from '../services/GemsService';
import { userApi } from '../api/UserApi';

export const editEmail = (user, email) => ({
  type: userActionTypes.EDIT_EMAIL,
  payload: { userId: user.id, email },
});

const watchEditEmail = takeEveryApiCall(userActionTypes.EDIT_EMAIL, userApi.editEmail);

export const confirmEmail = (user, code) => ({
  type: userActionTypes.CONFIRM_EMAIL,
  payload: { userId: user.id, code },
});

const watchConfirmEmail = takeEveryApiCall(userActionTypes.CONFIRM_EMAIL, userApi.confirmEmail);

export const resendConfirmEmail = user => ({
  type: userActionTypes.RESEND_CONFIRM_EMAIL,
  payload: { userId: user.id },
});

const watchResendConfirm = takeEveryApiCall(
  userActionTypes.RESEND_CONFIRM_EMAIL,
  userApi.resendConfirmEmail,
);

export const changePassword = (user, newPassword, oldPassword) => ({
  type: userActionTypes.CHANGE_PASSWORD,
  payload: { userId: user.id, newPassword, oldPassword },
});

const watchChangePassword = takeEveryApiCall(
  userActionTypes.CHANGE_PASSWORD,
  userApi.changePassword,
);


export const resetPassword = email => ({
  type: userActionTypes.RESET_PASSWORD,
  payload: { email },
});

const watchResetPassword = takeEveryApiCall(userActionTypes.RESET_PASSWORD, userApi.resetPassword);


export const restorePassword = (password, code) => ({
  type: userActionTypes.RESTORE_PASSWORD,
  payload: { password, code },
});

const watchRestorePassword = takeEveryApiCall(
  userActionTypes.RESTORE_PASSWORD,
  userApi.restorePassword,
);


export const assignAddress = (user, address = null) => ({
  type: userActionTypes.ASSIGN_ADDRESS,
  payload: { user, address },
});


function* handleAssignAddress({ payload: { user, address } }) {
  try {
    let params = { userId: user.id, address };
    if (!address) {
      const defaultAccount = gemsService.getDefaultAccount();
      const { result: signature } = yield call(gemsService.getAccountSingature, defaultAccount);
      params = { ...params, address: defaultAccount, signature };
    }
    const payload = yield call(userApi.assignAddress, params);

    yield put(({ type: userActionTypes.ASSIGN_ADDRESS_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: userActionTypes.ASSIGN_ADDRESS_FAILED, payload: error }));
  }
}

export function* userSagas() {
  yield takeEvery(userActionTypes.ASSIGN_ADDRESS, handleAssignAddress);

  yield fork(watchEditEmail);
  yield fork(watchChangePassword);
  yield fork(watchResetPassword);
  yield fork(watchRestorePassword);
  yield fork(watchConfirmEmail);
  yield fork(watchResendConfirm);
}
