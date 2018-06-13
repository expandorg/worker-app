import { combineReducers } from 'redux';
import {
  tasksActionTypes,
  gemsActionTypes,
  authActionTypes,
  userActionTypes,
  jobsActionTypes,
  questionsActionTypes,
  answersActionTypes,
} from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';

import depositStage from './depositStageReducer';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),

  login: requestUiStateReducer(authActionTypes.LOGIN, false, true),
  signup: requestUiStateReducer(authActionTypes.SIGNUP, false, true),

  loginMetamask: requestUiStateReducer(authActionTypes.LOGIN_METAMASK),
  signupMetamask: requestUiStateReducer(authActionTypes.SIGNUP_METAMASK),

  assignAddress: requestUiStateReducer(userActionTypes.ASSIGN_ADDRESS),
  editEmail: requestUiStateReducer(userActionTypes.EDIT_EMAIL),
  confirmEmail: requestUiStateReducer(userActionTypes.CONFIRM_EMAIL),
  resendConfirmEmail: requestUiStateReducer(userActionTypes.RESEND_CONFIRM_EMAIL),

  resetPassword: requestUiStateReducer(userActionTypes.RESET_PASSWORD),
  restorePassword: requestUiStateReducer(userActionTypes.RESTORE_PASSWORD),

  deposit: requestUiStateReducer(gemsActionTypes.DEPOSIT, true),
  depositStage,

  withdraw: requestUiStateReducer(gemsActionTypes.WITHDRAW, true),

  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN, true),
  fetchQuestion: requestUiStateReducer(questionsActionTypes.FETCH),
  fetchAnswer: requestUiStateReducer(answersActionTypes.FETCH, true),
  startTest: requestUiStateReducer(answersActionTypes.START, true),
  postAnswer: requestUiStateReducer(answersActionTypes.ANSWER, true),
  cancelTest: requestUiStateReducer(answersActionTypes.CANCEL),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),
});
