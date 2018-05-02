import { combineReducers } from 'redux';
import { tasksActionTypes } from '../../sagas/actionTypes';

import { requestUiStateReducer } from '../../common/app/requestUiState';
import errors from './errorsReducer';
import depositStage from './depositStageReducer';
import metamask from './metamaskReducer';
import locked from './lockedReducer';

export default combineReducers({
  errors,
  depositStage,
  metamask,
  locked,
  createTask: requestUiStateReducer(tasksActionTypes.CREATE),
});
