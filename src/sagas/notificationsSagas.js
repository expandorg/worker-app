// @flow

import { takeLatest, takeEvery, put } from 'redux-saga/effects';

import {
  appActionTypes,
  userActionTypes,
  addNotification,
  handldNotificationAdded,
} from '@expandorg/app-utils/app';

import { gemsActionTypes } from '@expandorg/app-gemtokens';
import {
  onboardingActionTypes,
  assignmentActionTypes,
  jobsActionTypes,
} from './actionTypes';

export const successMessageFactory = (message: string) => {
  function* handler(): any {
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

function* handleJobAssignFailed({ payload }) {
  const expanation =
    payload && payload.message !== 'null' ? `\n${payload.message}` : '';
  yield put(addNotification('error', `Job can not be assigned${expanation}`));
}

function* handleReport() {
  yield put(addNotification('success', 'Report has been sent'));
}

export function* notificationsSagas(): any {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);

  yield takeEvery(userActionTypes.UPDATED, handleUserUpdated);
  yield takeEvery(gemsActionTypes.TRANSACTION_FAILED, handleTxFailed);
  yield takeEvery(jobsActionTypes.ASSIGN_FAILED, handleJobAssignFailed);

  yield takeEvery(
    [
      onboardingActionTypes.REPORT_COMPLETE,
      assignmentActionTypes.REPORT_COMPLETE,
    ],
    handleReport
  );
}
