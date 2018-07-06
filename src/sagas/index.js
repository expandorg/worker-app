import { fork } from 'redux-saga/effects';
import { userSagas } from './userSagas';
import { gemsSagas } from './gemsSagas';
import { tasksSagas } from './tasksSagas';
import { jobsSagas } from './jobsSagas';
import { onboardingSagas } from './onboardingSagas';
import { authSagas } from './authSagas';
import { web3Sagas } from './web3Sagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(web3Sagas);
  yield fork(userSagas);
  yield fork(jobsSagas);
  yield fork(onboardingSagas);
  yield fork(tasksSagas);
  yield fork(gemsSagas);
}
