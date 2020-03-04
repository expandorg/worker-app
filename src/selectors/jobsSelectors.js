// @flow
import { createSelector } from 'reselect';

import { makeTaskAssignmentSelector } from './assignmentsSelectors';

export const jobEntitiesSelector = (state: Object) => state.jobs.entities;

export const jobListSelector = (state: Object) => state.jobs.list;

export const onboardingEntitiesSelector = (state: Object) =>
  state.jobs.onboarding.entities;

export const makeJobSelector = (): any =>
  createSelector(
    jobEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );

export const jobsSelector: any = createSelector(
  jobListSelector,
  jobEntitiesSelector,
  (list, entities) => list.map(id => entities[id])
);

export const makeAssignedJobSelector = (): any => {
  const taskAssignmentSelector = makeTaskAssignmentSelector();
  return createSelector(
    taskAssignmentSelector,
    jobEntitiesSelector,
    (assignment, jobs) => {
      if (!assignment) {
        return null;
      }
      return jobs[assignment.jobId];
    }
  );
};

export const makeOnboardingSelector = (): any =>
  createSelector(
    onboardingEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );

export const jobPreviewEntitiesSelector = (state: Object) =>
  state.jobs.preview.entities;

export const jobPreviewSamplesEntitiesSelector = (state: Object) =>
  state.jobs.preview.samples;

export const makeJobPreviewSelector = (): any =>
  createSelector(
    jobPreviewEntitiesSelector,
    jobPreviewSamplesEntitiesSelector,
    (state, id) => id,
    (entities, samples, id) => {
      const job = entities[id];
      if (!job) {
        return job;
      }
      return { ...job, sample: samples[id] };
    }
  );
