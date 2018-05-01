import { fork } from 'redux-saga/effects';
import { tasksSagas } from './tasksSagas';
import { userSagas } from './userSagas';

export default function* sagas() {
  yield fork(userSagas);
  yield fork(tasksSagas);
}
