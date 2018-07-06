// @flow
import { createSelector } from 'reselect';

import { makeTaskAssignmentSelector } from './assignmentsSelectors';

export const jobEntitiesSelector = (state: Object) => state.jobs.entities;

export const jobListSelector = (state: Object) => state.jobs.list;

export const onboardingStatusEntitiesSelector = (state: Object) => state.jobs.onboarding.entities;

export const makeJobSelector = () => createSelector(
  jobEntitiesSelector,
  (state, id) => id,
  (entities, id) => entities[id],
);

export const jobsSelector = createSelector(
  jobListSelector,
  jobEntitiesSelector,
  (list, entities) => list.map(id => entities[id]),
);


export const makeTaskFormSelector = () => {
  const taskAssignmentSelector = makeTaskAssignmentSelector();
  return createSelector(
    taskAssignmentSelector,
    jobEntitiesSelector,
    (assignment, jobs) => {
      if (!assignment) {
        return null;
      }
      const job = jobs[assignment.jobId];
      if (!job) {
        return null;
      }
      return job.taskForm;
    },
  );
};


export const makeOnboardingStatusSelector = () => createSelector(
  onboardingStatusEntitiesSelector,
  (state, id) => id,
  (entities, id) => entities[id],
);
