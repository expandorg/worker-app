import { combineReducers } from 'redux';

import worker from './workerReducer';
import stats from './statsReducer';
import gemsBalance from './gemsBalanceReducer';
import transactions from './transactionsReducer';

import isAuthorized from './user/isAuthorizedReducer';
import isJoined from './user/isJoinedReducer';

import ui from './ui';

export default combineReducers({
  worker,
  stats,
  gemsBalance,
  transactions,
  user: combineReducers({
    isAuthorized,
    isJoined,
  }),
  ui,
});
