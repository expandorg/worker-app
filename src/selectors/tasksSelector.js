import { createSelector } from 'reselect';

export const tasksEntitiesSelector = state => state.tasks.entities;

export const makeTaskSelector = () => createSelector(
  tasksEntitiesSelector,
  (state, props) => props.id,
  (entities, id) => entities[id] || null,
);
