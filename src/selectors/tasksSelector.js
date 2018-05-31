import { createSelector } from 'reselect';

export const tasksStateSelector = state => state.tasks;

export const assignmentsStateSelector = createSelector(
  tasksStateSelector,
  state => state.assignments,
);
