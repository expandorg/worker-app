import { fork } from 'redux-saga/effects';
import { tasksSagas } from './tasksSagas';
import { userSagas } from './userSagas';
import { gemsSagas } from './gemsSagas';

export default function* sagas() {
  yield fork(userSagas);
  yield fork(tasksSagas);
  yield fork(gemsSagas);
}
