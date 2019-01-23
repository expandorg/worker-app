// @flow

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

const NOTIFICATION_TIMEOUT = 3000;

declare type NotificationType = 'error' | 'success' | 'warning' | 'message';

export const addNotification = (type: NotificationType, message: string) => ({
  type: appActionTypes.NOTIFICATION_ADD,
  payload: { type, message },
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

export const successMessageFactory = message => {
  function* handler() {
    yield put(addNotification('success', message));
  }
  return handler;
};

function* handleUserUpdated({ payload }) {
  if (payload.params && payload.params.source) {
    const {
      params: { source },
      data: { user },
    } = payload;

    yield put(
      addNotification(
        'success',
        `Your ${source} has succeeded. Your new balance is ${user.gems.balance}`
      )
    );
  }
}

function* handleTxFailed({ payload }) {
  if (payload.params && payload.params.source) {
    const op = payload.params.source === 'withdraw' ? 'withdrawal' : 'deposit';
    yield put(addNotification('error', `Your ${op} has failed`));
  }
}

function* handleReport() {
  yield put(addNotification('success', 'Report has been sent'));
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
