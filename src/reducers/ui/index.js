import { combineReducers } from 'redux';
import {
  web3ActionTypes,
  tasksActionTypes,
  gemsActionTypes,
  authActionTypes,
  userActionTypes,
  jobsActionTypes,
  onboardingActionTypes,
} from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';

import depositStage from './depositStageReducer';
import notification from './notificationReducer';

import txState from './txStateReucer';

export default combineReducers({
  initGems: requestUiStateReducer(web3ActionTypes.INIT_GEMS),
  tx: txState,

  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),

  login: requestUiStateReducer(authActionTypes.LOGIN, false, true),
  signup: requestUiStateReducer(authActionTypes.SIGNUP, false, true),

  loginMetamask: requestUiStateReducer(authActionTypes.LOGIN_METAMASK),
  signupMetamask: requestUiStateReducer(authActionTypes.SIGNUP_METAMASK),

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

  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN, true),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),

  notification,
});
