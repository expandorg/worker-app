import { takeEvery, select } from 'redux-saga/effects';
import { userSelector } from '@expandorg/app-auth/selectors';
import { authActionTypes } from '@expandorg/app-auth';

import Mixpanel from '../common/Mixpanel';

import { tasksActionTypes } from './actionTypes';

function taskSubmitted({ meta }) {
  Mixpanel.track('complete_task', { jobId: meta.params.jobId });
}

const authCompleteAction = [
  authActionTypes.GET_CURRENT_COMPLETE,
  authActionTypes.LOGIN_COMPLETE,
  authActionTypes.SIGNUP_COMPLETE,
  authActionTypes.LOGIN_METAMASK_COMPLETE,
  authActionTypes.SIGNUP_METAMASK_COMPLETE,
];

function* userLoggedIn() {
  const user = yield select(userSelector);
  Mixpanel.identify(user.id);
  Mixpanel.people.set({
    id: user.id,
    email: user.email,
    address: user.address,
  });
}

// eslint-disable-next-line import/prefer-default-export
export function* mixpanelSagas() {
  yield takeEvery(tasksActionTypes.SUBMIT_COMPLETE, taskSubmitted);
  yield takeEvery(authCompleteAction, userLoggedIn);
}
