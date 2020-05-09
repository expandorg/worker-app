// @flow
import { createSelector } from 'reselect';

export const jobEntitiesSelector = (state: Object) => state.jobs.entities;

export const jobListSelector = (state: Object) => state.jobs.list;

export const eligibleJobsSelector = (state: Object) => state.jobs.eligible;

export const onboardingEntitiesSelector = (state: Object) =>
  state.jobs.onboarding.entities;

export const makeJobSelector = (): any =>
  createSelector(
    jobEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );

export const dashboardSelector: any = createSelector(
  jobEntitiesSelector,
  eligibleJobsSelector,
  (entities, eligible) => {
    const verificationJobs = eligible.verifications.map((id) => ({
      ...entities[id],
      key: `v-${id}`,
      isVerification: true,
    }));
    const taskJobs = eligible.tasks.map((id) => ({
      ...entities[id],
      key: `t-${id}`,
      isTask: true,
    }));
    return verificationJobs.concat(taskJobs);
  }
);

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
