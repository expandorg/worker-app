import { createSelector } from 'reselect';

export const assignmentEntitiesSelector = state => state.assignments.entities;

export const assignmentsListSelector = state => state.assignments.active;

export const assignmentsSelector = createSelector(
  assignmentEntitiesSelector,
  assignmentsListSelector,
  (entities, list) => list.map(id => entities[id]),
);
