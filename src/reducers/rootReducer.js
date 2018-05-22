import { combineReducers } from 'redux';

import user from './userReducer';
import stats from './statsReducer';
import gemsBalance from './gemsBalanceReducer';
import transactions from './transactionsReducer';
import jobs from './jobsReducer';

import metamask from './web3/metamaskReducer';

import isJoined from './isJoinedReducer';

import ui from './ui';

export default combineReducers({
  user,
  stats,
  gemsBalance,
  jobs,
  transactions,
  isJoined,
  ui,
  web3: combineReducers({
    metamask,
  }),
});
