import { combineReducers } from 'redux';

import { requestUiStateReducer } from '@expandorg/app-utils';
import { notificationReducer as notification } from '@expandorg/app-utils/app';

import { authStateReducers } from '@expandorg/app-auth';
import { web3ActionTypes } from '@expandorg/app-web3';
import { uiStateReducers as gemsState } from '@expandorg/app-gemtokens';

import {
  userActionTypes,
  jobsActionTypes,
  onboardingActionTypes,
  tasksActionTypes,
  assignmentActionTypes,
  responsesActionTypes,
} from '../sagas/actionTypes';

export default combineReducers({
  initGems: requestUiStateReducer(web3ActionTypes.INIT_GEMS),
  notification,
  ...authStateReducers,
  ...gemsState,

  assignAddress: requestUiStateReducer(userActionTypes.ASSIGN_ADDRESS),
  editEmail: requestUiStateReducer(userActionTypes.EDIT_EMAIL),
  confirmEmail: requestUiStateReducer(userActionTypes.CONFIRM_EMAIL),
  resendConfirmEmail: requestUiStateReducer(
    userActionTypes.RESEND_CONFIRM_EMAIL
  ),

  changePassword: requestUiStateReducer(
    userActionTypes.CHANGE_PASSWORD,
    false,
    true
  ),
  resetPassword: requestUiStateReducer(userActionTypes.RESET_PASSWORD),
  restorePassword: requestUiStateReducer(userActionTypes.RESTORE_PASSWORD),

  submitOnboarding: requestUiStateReducer(onboardingActionTypes.SUBMIT),
  reportOnboarding: requestUiStateReducer(onboardingActionTypes.REPORT),

  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN, true),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),

  reportAssignment: requestUiStateReducer(assignmentActionTypes.REPORT),
  cancelAssignment: requestUiStateReducer(assignmentActionTypes.CANCEL),

  verifyResponse: requestUiStateReducer(responsesActionTypes.VERIFY),
});
