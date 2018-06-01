import { combineReducers } from 'redux';

import user from './userReducer';
import gemsBalance from './gemsBalanceReducer';
import transactions from './transactionsReducer';

import jobsList from './jobs/jobsListReducer';
import jobEntities from './jobs/jobEntitiesReducer';

import activeAssignments from './assignments/activeAssignmentsReducer';
import assignmentsEntities from './assignments/assignmentsEntitiesReducer';

import tasksEntities from './tasks/tasksEntitiesReducer';

import metamask from './web3/metamaskReducer';

import ui from './ui';

export default combineReducers({
  user,
  gemsBalance,
  jobs: combineReducers({
    entities: jobEntities,
    list: jobsList,
  }),
  tasks: combineReducers({
    entities: tasksEntities,
  }),
  assignments: combineReducers({
    active: activeAssignments,
    entities: assignmentsEntities,
  }),
  transactions,
  ui,
  web3: combineReducers({
    metamask,
  }),
});
