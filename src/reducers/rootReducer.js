import { combineReducers } from 'redux';

import user from './userReducer';
import stats from './statsReducer';
import gemsBalance from './gemsBalanceReducer';
import transactions from './transactionsReducer';

import jobsList from './jobs/jobsListReducer';
import jobEntities from './jobs/jobEntitiesReducer';

import metamask from './web3/metamaskReducer';

import ui from './ui';

export default combineReducers({
  user,
  stats,
  gemsBalance,
  jobs: combineReducers({
    entities: jobEntities,
    list: jobsList,
  }),
  transactions,
  ui,
  web3: combineReducers({
    metamask,
  }),
});
