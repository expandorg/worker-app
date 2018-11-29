import { combineReducers } from 'redux';

import { requestUiStateReducer } from '@gemsorg/app-utils';
import { authStateReducers } from '@gemsorg/app-auth';
import { web3ActionTypes } from '@gemsorg/app-web3';

import {
  gemsActionTypes,
  userActionTypes,
  jobsActionTypes,
  onboardingActionTypes,
  tasksActionTypes,
  assignmentActionTypes,
  responsesActionTypes,
} from '../../sagas/actionTypes';

import depositStage from './depositStageReducer';
import notification from './notificationReducer';

import tx from './txStateReucer';

export default combineReducers({
  initGems: requestUiStateReducer(web3ActionTypes.INIT_GEMS),
  ...authStateReducers,
  notification,

  tx,
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

  gemBalance: requestUiStateReducer(gemsActionTypes.FETCH_BALANCE),
  deposit: requestUiStateReducer(gemsActionTypes.DEPOSIT, true),
  depositStage,

  withdraw: requestUiStateReducer(gemsActionTypes.WITHDRAW, true),

  submitOnboarding: requestUiStateReducer(onboardingActionTypes.SUBMIT),
  reportOnboarding: requestUiStateReducer(onboardingActionTypes.REPORT),

  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN, true),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),

  reportAssignment: requestUiStateReducer(assignmentActionTypes.REPORT),
  cancelAssignment: requestUiStateReducer(assignmentActionTypes.CANCEL),

  verifyResponse: requestUiStateReducer(responsesActionTypes.VERIFY),
});
