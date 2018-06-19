import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');

const assignmentSchema = new schema.Entity(
  'assignments',
  {},
  {
    idAttribute: 'jobId',
  },
);

const taskSchema = new schema.Entity('tasks');

const responseSchema = new schema.Entity('responses');

const authResponseSchema = {
  assignments: [assignmentSchema],
  assignedTasks: [taskSchema],
  assignedResponses: [responseSchema],
};

export {
  jobSchema,
  assignmentSchema,
  taskSchema,
  responseSchema,

  authResponseSchema,
};
