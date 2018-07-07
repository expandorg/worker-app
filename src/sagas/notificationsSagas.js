import { takeLatest, call, put } from 'redux-saga/effects';

import { appActionTypes } from './actionTypes';

import { delay } from '../common/app/apiCallSaga';


export const addNotification = (type, payload) => ({
  type: appActionTypes.NOTIFICATION_ADD,
  payload: { type, text: payload },
});

export const clearNotification = () => ({
  type: appActionTypes.NOTIFICATION_REMOVE,
  payload: null,
});

function* handleAddNotifications() {
  yield call(delay, 3000);
  yield put(clearNotification());
}


export function* notificationsSagas() {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handleAddNotifications);
}
