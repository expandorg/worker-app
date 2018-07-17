import { takeEvery, fork, call, select, put, getContext } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import {
  authActionTypes,
  jobsActionTypes,
  tasksActionTypes,
  userActionTypes,
  gemsActionTypes,
} from './actionTypes';

import { userSelector } from '../selectors/userSelectors';

import { userApi } from '../api/UserApi';
import { GtmActions } from '../common/gtm/GtmEvents';

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
  meta: {
    track: { action: GtmActions.ChangePassword },
  },
});

const watchChangePassword = takeEveryApiCall(
  userActionTypes.CHANGE_PASSWORD,
  userApi.changePassword,
);


export const resetPassword = email => ({
  type: userActionTypes.RESET_PASSWORD,
  payload: { email },
  meta: {
    track: { action: GtmActions.ForgotPassword },
  },
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
      const services = yield getContext('services');
      const gemsService = services.resolve('gems');

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

export const userUpdated = (data, params) => ({
  type: userActionTypes.UPDATED,
  payload: { data, params },
});


const getNotificationSourceType = (type) => {
  switch (type) {
    case gemsActionTypes.WITHDRAW_COMPLETE:
      return 'withdraw';
    case gemsActionTypes.DEPOSIT_COMPLETE:
      return 'deposit';
    default:
      break;
  }
  return null;
};

function* handleUserChangedSaga({ type }) {
  const user = yield select(userSelector);
  if (user.pendingTx) {
    const services = yield getContext('services');
    const eventSources = services.resolve('eventSources');
    const source = getNotificationSourceType(type);
    eventSources.subscribe('tx', { tx: user.pendingTx, source });
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

  yield fork(watchEditEmail);
  yield fork(watchChangePassword);
  yield fork(watchResetPassword);
  yield fork(watchRestorePassword);
  yield fork(watchConfirmEmail);
  yield fork(watchResendConfirm);
}
