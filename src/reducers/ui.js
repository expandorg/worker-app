import { combineReducers } from 'redux';

import { requestUiStateReducer } from '@expandorg/app-utils';
import { notificationReducer as notification } from '@expandorg/app-utils/app';
import { uiStateReducers as accountState } from '@expandorg/app-account';

import { authStateReducers as authState } from '@expandorg/app-auth';
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
  notification,
  ...authState,
  ...gemsState,
  ...accountState,

  submitOnboarding: requestUiStateReducer(onboardingActionTypes.SUBMIT),
  reportOnboarding: requestUiStateReducer(onboardingActionTypes.REPORT),

  assignTask: requestUiStateReducer(jobsActionTypes.ASSIGN_TASK, true),
  assignVerification: requestUiStateReducer(
    jobsActionTypes.ASSIGN_VERIFICATION,
    true
  ),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),

  reportAssignment: requestUiStateReducer(assignmentActionTypes.REPORT),
  cancelAssignment: requestUiStateReducer(assignmentActionTypes.CANCEL),

  verifyResponse: requestUiStateReducer(responsesActionTypes.VERIFY),

  getProfile: requestUiStateReducer(profileActionTypes.FETCH),
  getProfileFilters: requestUiStateReducer(profileActionTypes.FETCH_FILTERS),
  saveProfile: requestUiStateReducer(profileActionTypes.SAVE),
  startDispute: requestUiStateReducer(profileActionTypes.START_DISPUTE),
});
