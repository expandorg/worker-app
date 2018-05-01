import { combineReducers } from 'redux';

import { actions } from '../actions/action-types';

import worker from './workerReducer';
import stats from './statsReducer';

import ui from './ui';

function simpleReducer(defaultValue, actionType) {
  return (state = defaultValue, action) => (action.type === actionType ? action.payload : state);
}

export default combineReducers({
  isAuthorized: simpleReducer(null, actions.SET_IS_AUTHORIZED),
  isJoined: simpleReducer(false, actions.SET_IS_JOINED),
  depositStage: simpleReducer(0, actions.SET_DEPOSIT_STAGE),
  worker,
  stats,
  gemsBalance: simpleReducer(null, actions.SET_GEMS_BALANCE),
  metamask: simpleReducer(null, actions.SET_METAMASK),
  locked: simpleReducer(null, actions.SET_METAMASK_LOCKED),
  transactions: simpleReducer(null, actions.SET_TRANSACTIONS),
  ui,
});
