import {
  takeLatest,
  takeEvery,
  call,
  put,
  take,
  race,
} from 'redux-saga/effects';

import { delay } from '@expandorg/utils';
import { appActionTypes, userActionTypes } from '@expandorg/app-utils/app';
import { gemsActionTypes } from '@expandorg/app-gemtokens';

import { onboardingActionTypes, assignmentActionTypes } from './actionTypes';

import { NotificationType } from '../model/enums';

const NOTIFICATION_TIMEOUT = 3000;

export const addNotification = (notificationType, payload) => ({
  type: appActionTypes.NOTIFICATION_ADD,
  payload: { notificationType, payload },
});

export const clearNotification = () => ({
  type: appActionTypes.NOTIFICATION_REMOVE,
  payload: null,
});

function* handldNotificationAdded() {
  const { timeout } = yield race({
    timeout: call(delay, NOTIFICATION_TIMEOUT),
    clear: take(appActionTypes.NOTIFICATION_REMOVE),
  });
  if (timeout) {
    yield put(clearNotification());
  }
}

function* handleUserUpdated({ payload }) {
  if (payload.params.source) {
    yield put(addNotification(NotificationType.Balance, payload));
  }
}

function* handleTxFailed({ payload }) {
  yield put(addNotification(NotificationType.TxError, payload));
}

function* handleReport({ type }) {
  yield put(addNotification(NotificationType.Report, { type }));
}

export function* notificationsSagas() {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);

  yield takeEvery(userActionTypes.UPDATED, handleUserUpdated);
  yield takeEvery(gemsActionTypes.TRANSACTION_FAILED, handleTxFailed);

  yield takeEvery(
    [
      onboardingActionTypes.REPORT_COMPLETE,
      assignmentActionTypes.REPORT_COMPLETE,
    ],
    handleReport
  );
}
