import { takeEvery, select, getContext } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { userSelector } from '@expandorg/app-auth/selectors';
import { authActionTypes } from '@expandorg/app-auth';
import { gemsActionTypes } from '@expandorg/app-gemtokens';
import { accountActionTypes } from '@expandorg/app-account';
import { handleAssignAddress } from '@expandorg/app-account/sagas';

import { jobsActionTypes, tasksActionTypes } from './actionTypes';

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

  accountActionTypes.ASSIGN_ADDRESS_COMPLETE,
  accountActionTypes.CONFIRM_EMAIL_COMPLETE,
  accountActionTypes.EDIT_EMAIL_COMPLETE,

  jobsActionTypes.ASSIGN_COMPLETE,
  tasksActionTypes.SUBMIT_COMPLETE,
  gemsActionTypes.WITHDRAW_COMPLETE,
  gemsActionTypes.DEPOSIT_COMPLETE,
];

// eslint-disable-next-line import/prefer-default-export
export function* userSagas() {
  yield takeEvery(accountActionTypes.ASSIGN_ADDRESS, handleAssignAddress);
  yield takeEvery(actionsThatChangesUser, handleUserChangedSaga);

  yield takeEvery(
    [
      accountActionTypes.EDIT_EMAIL,
      accountActionTypes.CONFIRM_EMAIL,
      accountActionTypes.RESEND_CONFIRM_EMAIL,
      accountActionTypes.CHANGE_PASSWORD,
    ],
    handleAsyncCall
  );
}
