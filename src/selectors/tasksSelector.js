import { createSelector } from 'reselect';

export const tasksEntitiesSelector = state => state.tasks.entities;

export const assignedTasksListSelector = state => state.tasks.assigned;

export const makeTaskSelector = () => createSelector(
  tasksEntitiesSelector,
  (state, id) => id,
  (entities, id) => entities[id] || null,
);

export const assignedTasksSelector = createSelector(
  tasksEntitiesSelector,
  assignedTasksListSelector,
  (entities, list) => list.map(id => entities[id]),
);
