import { fork } from 'redux-saga/effects';
import { appSagas } from './appSagas';
import { userSagas } from './userSagas';
import { gemsSagas } from './gemsSagas';
import { tasksSagas } from './tasksSagas';

export default function* sagas() {
  yield fork(appSagas);
  yield fork(userSagas);
  yield fork(tasksSagas);
  yield fork(gemsSagas);
}
