import { combineReducers } from 'redux';

import { requestUiStateReducer } from '@expandorg/app-utils';
import { notificationReducer as notification } from '@expandorg/app-utils/app';
import { uiStateReducers as accountState } from '@expandorg/app-account';

import { authStateReducers as authState } from '@expandorg/app-auth';
import { web3ActionTypes } from '@expandorg/app-web3';
import { uiStateReducers as gemsState } from '@expandorg/app-gemtokens';

import {
  jobsActionTypes,
  onboardingActionTypes,
  tasksActionTypes,
  assignmentActionTypes,
  responsesActionTypes,
  profileActionTypes,
} from '../sagas/actionTypes';

export default combineReducers({
  initGems: requestUiStateReducer(web3ActionTypes.INIT_GEMS),
  notification,
  ...authState,
  ...gemsState,
  ...accountState,

  submitOnboarding: requestUiStateReducer(onboardingActionTypes.SUBMIT),
  reportOnboarding: requestUiStateReducer(onboardingActionTypes.REPORT),

  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN, true),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),

  reportAssignment: requestUiStateReducer(assignmentActionTypes.REPORT),
  cancelAssignment: requestUiStateReducer(assignmentActionTypes.CANCEL),

  verifyResponse: requestUiStateReducer(responsesActionTypes.VERIFY),

  saveProfile: requestUiStateReducer(profileActionTypes.SAVE),
});
