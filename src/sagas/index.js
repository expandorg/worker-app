import { fork } from 'redux-saga/effects';
import { userSagas } from './userSagas';
import { gemsSagas } from './gemsSagas';
import { tasksSagas } from './tasksSagas';
import { jobsSagas } from './jobsSagas';
import { authSagas } from './authSagas';
import { web3Sagas } from './web3Sagas';
import { questionsSagas } from './questionsSagas';
import { answersSagas } from './answersSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(web3Sagas);
  yield fork(userSagas);
  yield fork(tasksSagas);
  yield fork(jobsSagas);
  yield fork(gemsSagas);
  yield fork(questionsSagas);
  yield fork(answersSagas);
}
