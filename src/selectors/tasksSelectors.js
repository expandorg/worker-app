// @flow
import { createSelector } from 'reselect';

import { taskAssignmentsSelector, verificationAssignmentsSelector } from './assignmentsSelectors';

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;
export const responsesEntitiesSelector = (state: Object) => state.responses.entities;

export const makeTaskSelector = () => createSelector(
  tasksEntitiesSelector,
  (state, id) => id,
  (entities, id) => entities[id] || null,
);


export const assignedTasksSelector = createSelector(
  tasksEntitiesSelector,
  taskAssignmentsSelector,
  (entities, assignments) => assignments.map(assignment => entities[assignment.taskId]),
);


export const assignedVerificationsSelector = createSelector(
  tasksEntitiesSelector,
  responsesEntitiesSelector,
  verificationAssignmentsSelector,
  (taskEntities, responseEntities, assignments) => assignments.map(assignment => ({
    task: taskEntities[assignment.taskId],
    response: responseEntities[assignment.responseId],
  })),
);
