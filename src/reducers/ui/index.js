import { combineReducers } from 'redux';
import {
  tasksActionTypes,
  gemsActionTypes,
  authActionTypes,
  userActionTypes,
  jobsActionTypes,
} from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';

import depositStage from './depositStageReducer';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),
  login: requestUiStateReducer(authActionTypes.LOGIN),
  signup: requestUiStateReducer(authActionTypes.SIGNUP),

  loginMetamask: requestUiStateReducer(authActionTypes.LOGIN_METAMASK),
  signupMetamask: requestUiStateReducer(authActionTypes.SIGNUP_METAMASK),

  assignAddress: requestUiStateReducer(userActionTypes.ASSIGN_ADDRESS),


  depositGems: requestUiStateReducer(gemsActionTypes.DEPOSIT),
  withdraw: requestUiStateReducer(gemsActionTypes.WITHDRAW),

  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN, true),

  submitTask: requestUiStateReducer(tasksActionTypes.SUBMIT),
  depositStage,
});
