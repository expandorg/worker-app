import { combineReducers } from 'redux';
import { tasksActionTypes } from '../../actions/action-types';

import { requestUiStateReducer } from '../../common/app/requestUiState';
import errorsReducer from './errorsReducer';

export default combineReducers({
  errors: errorsReducer,
  createTask: requestUiStateReducer(tasksActionTypes.CREATE),
});
