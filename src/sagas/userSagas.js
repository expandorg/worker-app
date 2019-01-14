import { takeEvery, call, select, put, getContext } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { userSelector } from '@expandorg/app-auth/selectors';
import { authActionTypes } from '@expandorg/app-auth';
import { gemsActionTypes } from '@expandorg/app-gemtokens';

import {
  jobsActionTypes,
  tasksActionTypes,
  userActionTypes,
} from './actionTypes';

import { userApi } from '../api/UserApi';

export const editEmail = (user, email) => ({
  type: userActionTypes.EDIT_EMAIL,
  payload: { userId: user.id, email },
  asyncCall: userApi.editEmail,
});

export const confirmEmail = (user, code) => ({
  type: userActionTypes.CONFIRM_EMAIL,
  payload: { userId: user.id, code },
  asyncCall: userApi.confirmEmail,
});

export const resendConfirmEmail = user => ({
  type: userActionTypes.RESEND_CONFIRM_EMAIL,
  payload: { userId: user.id },
  asyncCall: userApi.resendConfirmEmail,
});

export const changePassword = (user, newPassword, oldPassword) => ({
  type: userActionTypes.CHANGE_PASSWORD,
  payload: { userId: user.id, newPassword, oldPassword },
  asyncCall: userApi.changePassword,
});

export const resetPassword = email => ({
  type: userActionTypes.RESET_PASSWORD,
  payload: { email },
  asyncCall: userApi.resetPassword,
});

export const restorePassword = (password, code) => ({
  type: userActionTypes.RESTORE_PASSWORD,
  payload: { password, code },
  asyncCall: userApi.restorePassword,
});

export const assignAddress = (user, address = null) => ({
  type: userActionTypes.ASSIGN_ADDRESS,
  payload: { user, address },
});

function* handleAssignAddress({ payload: { user, address } }) {
  try {
    let params = { userId: user.id, address };
    if (!address) {
      const services = yield getContext('services');
      const gemsService = services.resolve('gems');

      const defaultAccount = gemsService.getDefaultAccount();
      const { result: signature } = yield call(
        gemsService.getAccountSingature,
        defaultAccount
      );
      params = { ...params, address: defaultAccount, signature };
    }
    const payload = yield call(userApi.assignAddress, params);

    yield put({ type: userActionTypes.ASSIGN_ADDRESS_COMPLETE, payload });
  } catch (error) {
    yield put({ type: userActionTypes.ASSIGN_ADDRESS_FAILED, payload: error });
  }
}

function* handleUserChangedSaga() {
  const user = yield select(userSelector);
  if (user.pendingTx) {
    const services = yield getContext('services');
    const eventSources = services.resolve('eventSources');
    eventSources.subscribe('tx', {
      tx: user.pendingTx.hash,
      source: user.pendingTx.type,
    });
  }
}

const actionsThatChangesUser = [
  authActionTypes.GET_CURRENT_COMPLETE,
  authActionTypes.LOGIN_COMPLETE,
  authActionTypes.SIGNUP_COMPLETE,
  authActionTypes.LOGIN_METAMASK_COMPLETE,
  authActionTypes.SIGNUP_METAMASK_COMPLETE,
  userActionTypes.ASSIGN_ADDRESS_COMPLETE,
  userActionTypes.CONFIRM_EMAIL_COMPLETE,
  userActionTypes.EDIT_EMAIL_COMPLETE,
  jobsActionTypes.ASSIGN_COMPLETE,
  tasksActionTypes.SUBMIT_COMPLETE,
  gemsActionTypes.WITHDRAW_COMPLETE,
  gemsActionTypes.DEPOSIT_COMPLETE,
];

export function* userSagas() {
  yield takeEvery(userActionTypes.ASSIGN_ADDRESS, handleAssignAddress);
  yield takeEvery(actionsThatChangesUser, handleUserChangedSaga);

  yield takeEvery(
    [
      userActionTypes.EDIT_EMAIL,
      userActionTypes.CONFIRM_EMAIL,
      userActionTypes.RESEND_CONFIRM_EMAIL,
      userActionTypes.CHANGE_PASSWORD,
      userActionTypes.RESET_PASSWORD,
      userActionTypes.RESTORE_PASSWORD,
    ],
    handleAsyncCall
  );
}
