import { combineReducers } from 'redux';
import {
  tasksActionTypes,
  gemsActionTypes,
  authActionTypes,
  userActionTypes,
  jobsActionTypes,
} from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';

import errors from './errorsReducer';
import depositStage from './depositStageReducer';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),
  login: requestUiStateReducer(authActionTypes.LOGIN),
  signup: requestUiStateReducer(authActionTypes.SIGNUP),
  assignAddress: requestUiStateReducer(userActionTypes.ASSIGN_ADDRESS),


  assignJob: requestUiStateReducer(jobsActionTypes.ASSIGN),

  depositGems: requestUiStateReducer(gemsActionTypes.DEPOSIT),
  withdraw: requestUiStateReducer(gemsActionTypes.WITHDRAW),
  createTask: requestUiStateReducer(tasksActionTypes.CREATE),
  errors,
  depositStage,
});
