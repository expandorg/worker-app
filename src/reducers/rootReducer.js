import { combineReducers } from 'redux';

import { metamaskReducer as metamask } from '@expandorg/app-web3';
import { gemsBalanceReducer as gemsBalance } from '@expandorg/app-gemtokens';

import user from './userReducer';
import authToken from './authTokenReducer';

import profile from './profile/profileReducer';
import filters from './profile/filtersReducer';

import profileSummary from './profile/summaryReducer';
import taskHistoryList from './profile/taskHistoryReducer';
import taskHistoryEntities from './profile/taskHistoryEntitiesReducer';

import jobsList from './jobs/jobsListReducer';
import jobEntities from './jobs/jobEntitiesReducer';

import onboardingEntities from './jobs/onboardingEntitiesReducer';

import previewEntities from './jobs/previewEntitiesReducer';
import previewSamples from './jobs/previewSamplesReducer';

import assignmentEntities from './assignments/assignmentEntitiesReducer';
import assignmentsList from './assignments/assignmentsListReducer';

import tasksEntities from './tasks/tasksEntitiesReducer';
import assignedTasks from './tasks/assignedTasksReducer';

import responseEntities from './responses/responseEntitiesReducer';
import assignedResponses from './responses/assignedResponsesReducer';

import transactionsHistory from './profile/transactionsHistoryReducer';

import disputeEntities from './disputes/disputeEntitiesReducer';

import ui from './ui';

export default combineReducers({
  user,
  authToken,
  gemsBalance,
  profile: combineReducers({
    profile,
    filters,
    summary: profileSummary,
    taskHistory: combineReducers({
      list: taskHistoryList,
      entities: taskHistoryEntities,
    }),
    transactionsHistory,
  }),
  jobs: combineReducers({
    entities: jobEntities,
    list: jobsList,
    onboarding: combineReducers({
      entities: onboardingEntities,
    }),
    preview: combineReducers({
      entities: previewEntities,
      samples: previewSamples,
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
  disputes: combineReducers({
    entities: disputeEntities,
  }),
  web3: combineReducers({
    metamask,
  }),
  ui,
});
