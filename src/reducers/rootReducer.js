import { combineReducers } from 'redux';

import { metamaskReducer as metamask } from '@expandorg/app-web3';
import { gemsBalanceReducer as gemsBalance } from '@expandorg/app-gemtokens';

import user from './userReducer';

import jobsList from './jobs/jobsListReducer';
import jobEntities from './jobs/jobEntitiesReducer';
import onboardingEntities from './jobs/onboardingEntitiesReducer';

import assignmentEntities from './assignments/assignmentEntitiesReducer';
import assignmentsList from './assignments/assignmentsListReducer';

import tasksEntities from './tasks/tasksEntitiesReducer';
import assignedTasks from './tasks/assignedTasksReducer';

import responseEntities from './responses/responseEntitiesReducer';
import assignedResponses from './responses/assignedResponsesReducer';

import ui from './ui';

export default combineReducers({
  user,
  gemsBalance,
  jobs: combineReducers({
    entities: jobEntities,
    list: jobsList,
    onboarding: combineReducers({
      entities: onboardingEntities,
    }),
  }),
  assignments: combineReducers({
    entities: assignmentEntities,
    list: assignmentsList,
  }),
  tasks: combineReducers({
    entities: tasksEntities,
    assigned: assignedTasks,
  }),
  responses: combineReducers({
    entities: responseEntities,
    assigned: assignedResponses,
  }),
  ui,
  web3: combineReducers({
    metamask,
  }),
});
