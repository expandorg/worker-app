import { createSelector } from 'reselect';

export const jobEntitiesSelector = state => state.jobs.entities;

export const jobListSelector = state => state.jobs.list;

export const jobIdSelector = (state, id) => state.jobs.entities[id];

export const jobsSelector = createSelector(
  jobListSelector,
  jobEntitiesSelector,
  jobIdSelector,
  (list, entities) => list.map(id => entities[id]),
);
