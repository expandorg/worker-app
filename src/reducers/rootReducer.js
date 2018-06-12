import { combineReducers } from 'redux';

import user from './userReducer';
import gemsBalance from './gemsBalanceReducer';

import jobsList from './jobs/jobsListReducer';
import jobEntities from './jobs/jobEntitiesReducer';

import tasksEntities from './tasks/tasksEntitiesReducer';
import assignedTasks from './tasks/assignedTasksReducer';

import metamask from './web3/metamaskReducer';

import ui from './ui';

export default combineReducers({
  user,
  gemsBalance,
  jobs: combineReducers({
    list: jobsList,
    entities: jobEntities,
  }),
  tasks: combineReducers({
    entities: tasksEntities,
    assigned: assignedTasks,
  }),
  ui,
  web3: combineReducers({
    metamask,
  }),
});
