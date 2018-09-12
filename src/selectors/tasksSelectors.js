// @flow
import { createSelector } from 'reselect';

import {
  taskAssignmentsSelector,
  verificationAssignmentsSelector,
} from './assignmentsSelectors';

import { jobEntitiesSelector } from './jobsSelectors';

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;
export const responsesEntitiesSelector = (state: Object) =>
  state.responses.entities;

export const makeTaskSelector = () =>
  createSelector(
    tasksEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id] || null
  );

export const assignedTasksSelector = createSelector(
  tasksEntitiesSelector,
  jobEntitiesSelector,
  taskAssignmentsSelector,
  (entities, jobEntities, assignments) =>
    assignments.map(assignment => ({
      ...entities[assignment.taskId],
      job: jobEntities[assignment.jobId],
    }))
);

export const assignedVerificationsSelector = createSelector(
  tasksEntitiesSelector,
  responsesEntitiesSelector,
  jobEntitiesSelector,
  verificationAssignmentsSelector,
  (taskEntities, responseEntities, jobEntities, assignments) =>
    assignments.map(assignment => ({
      ...taskEntities[assignment.taskId],
      job: jobEntities[assignment.jobId],
      response: responseEntities[assignment.responseId],
    }))
);
