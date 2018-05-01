import { fork } from 'redux-saga/effects';
import { tasksSagas } from './tasksSagas';

export default function* sagas() {
  yield fork(tasksSagas);
}
