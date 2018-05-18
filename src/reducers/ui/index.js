import { combineReducers } from 'redux';
import { tasksActionTypes, gemsActionTypes, authActionTypes } from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';

import errors from './errorsReducer';
import depositStage from './depositStageReducer';
import metamask from './metamaskReducer';
import locked from './lockedReducer';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),
  depositGems: requestUiStateReducer(gemsActionTypes.DEPOSIT),
  withdraw: requestUiStateReducer(gemsActionTypes.WITHDRAW),
  createTask: requestUiStateReducer(tasksActionTypes.CREATE),
  errors,
  depositStage,
  metamask,
  locked,
});
