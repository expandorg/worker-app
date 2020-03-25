// @flow
import { createSelector } from 'reselect';

import { assignmentsSelector } from './assignmentsSelectors';

import { jobEntitiesSelector } from './jobsSelectors';

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;

export const makeTaskSelector = (): any =>
  createSelector(
    tasksEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id] || null
  );

export const assignedTasksSelector: any = createSelector(
  tasksEntitiesSelector,
  jobEntitiesSelector,
  assignmentsSelector,
  (entities, jobEntities, assignments) =>
    assignments.map((assignment) => ({
      ...entities[assignment.taskId],
      job: jobEntities[assignment.jobId],
    }))
);
