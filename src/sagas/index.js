import { fork } from 'redux-saga/effects';

import { web3Sagas } from '@expandorg/app-web3';
import { gemsSagas } from '@expandorg/app-gemtokens/sagas';

import { userSagas } from './userSagas';

import { tasksSagas } from './tasksSagas';
import { jobsSagas } from './jobsSagas';
import { onboardingSagas } from './onboardingSagas';
import { authSagas } from './authSagas';
import { notificationsSagas } from './notificationsSagas';
import { responsesSagas } from './responsesSagas';
import { assignmentsSagas } from './assignmentsSagas';
import { profileSagas } from './profileSagas';
import { mixpanelSagas } from './mixpanelSagas';
import { transactionsSagas } from './transactionsSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(web3Sagas);
  yield fork(userSagas);
  yield fork(jobsSagas);
  yield fork(onboardingSagas);
  yield fork(tasksSagas);
  yield fork(gemsSagas);
  yield fork(notificationsSagas);
  yield fork(responsesSagas);
  yield fork(assignmentsSagas);
  yield fork(profileSagas);
  yield fork(mixpanelSagas);
  yield fork(transactionsSagas);
}
