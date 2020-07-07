// @flow
import { createSelector } from 'reselect';

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;

export const makeTaskSelector = (): any =>
  createSelector(
    tasksEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id] || null
  );
