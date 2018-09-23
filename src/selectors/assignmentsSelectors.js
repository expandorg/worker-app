// @flow
import { createSelector } from 'reselect';

export const assignmentsEntitiesSelector = (state: Object) =>
  state.assignments.entities;

export const assignmentsListSelector = (state: Object) =>
  state.assignments.list;

export const assignmentsSelector = createSelector(
  assignmentsEntitiesSelector,
  assignmentsListSelector,
  (entities, list) => list.map(jobId => entities[jobId])
);

export const makeJobAssignmentSelector = () =>
  createSelector(
    assignmentsSelector,
    (state, jobId) => +jobId,
    (assignments, jobId) =>
      assignments.find(assignment => assignment.jobId === jobId)
  );

export const makeTaskAssignmentSelector = () =>
  createSelector(
    assignmentsSelector,
    (state, taskId) => +taskId,
    (assignments, taskId) =>
      assignments.find(assignment => assignment.taskId === taskId)
  );
