import { combineReducers } from 'redux';
import { tasksActionTypes, gemsActionTypes } from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';

import errors from './errorsReducer';
import depositStage from './depositStageReducer';
import metamask from './metamaskReducer';
import locked from './lockedReducer';

export default combineReducers({
  errors,
  depositStage,
  depositGems: requestUiStateReducer(gemsActionTypes.DEPOSIT),
  metamask,
  locked,
  createTask: requestUiStateReducer(tasksActionTypes.CREATE),
});
