// @flow
import { createSelector } from 'reselect';

export const assignmentsEntitiesSelector = (state: Object) => state.assignments.entities;

export const assignmentsListSelector = (state: Object) => state.assignments.list;

export const assignmentsSelector = createSelector(
  assignmentsEntitiesSelector,
  assignmentsListSelector,
  (entities, list) => list.map(jobId => entities[jobId]),
);


export const taskAssignmentsSelector = createSelector(
  assignmentsSelector,
  assignments => assignments.filter(assignment => assignment.responseId === null),
);

export const verificationAssignmentsSelector = createSelector(
  assignmentsSelector,
  assignments => assignments.filter(assignment => assignment.responseId !== null),
);
