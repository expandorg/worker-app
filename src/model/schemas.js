// @flow
import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');
const jobPreviewSchema = new schema.Entity('jobPreviews');

const assignmentSchema = new schema.Entity('assignments');

const taskSchema = new schema.Entity('tasks');

const responseSchema = new schema.Entity('responses');

const onboardingSchema = new schema.Entity(
  'onboarding',
  {},
  { idAttribute: 'jobId' }
);

const disputeSchema = new schema.Entity(
  'disputes',
  {},
  { idAttribute: 'response_id' }
);

export {
  jobSchema,
  jobPreviewSchema,
  onboardingSchema,
  assignmentSchema,
  taskSchema,
  disputeSchema,
  responseSchema,
};
