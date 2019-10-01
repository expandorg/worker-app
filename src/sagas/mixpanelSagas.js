import { takeEvery, select } from 'redux-saga/effects';
import { userSelector } from '@expandorg/app-auth/selectors';

import Mixpanel from '../common/Mixpanel';

import { jobsActionTypes } from './actionTypes';

function* taskSubmitted() {
  const user = yield select(userSelector);
  Mixpanel.identify(user.id);
  Mixpanel.track('complete_task');
}

// eslint-disable-next-line import/prefer-default-export
export function* mixpanelSagas() {
  yield takeEvery(jobsActionTypes.ASSIGN_COMPLETE, taskSubmitted);
}
