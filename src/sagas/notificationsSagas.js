import { takeLatest, takeEvery, call, put, take, race } from 'redux-saga/effects';

import { appActionTypes, userActionTypes } from './actionTypes';

import { delay } from '../common/app/apiCallSaga';

const NOTIFICATION_TIMEOUT = 3000;

export const addNotification = (type, data) => ({
  type: appActionTypes.NOTIFICATION_ADD,
  payload: { type, data },
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


function* handleUserUpdated({ payload: { data, params } }) {
  yield put(addNotification(params.type, data));
}

export function* notificationsSagas() {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);

  yield takeEvery(userActionTypes.UPDATED, handleUserUpdated);
}
