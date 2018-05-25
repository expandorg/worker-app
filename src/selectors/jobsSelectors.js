import { createSelector } from 'reselect';

export const jobEntitiesSelector = state => state.jobs.entities;

export const jobListSelector = state => state.jobs.list;

export const jobsSelector = createSelector(
  jobListSelector,
  jobEntitiesSelector,
  (list, entities) => list.map(id => entities[id]),
);
