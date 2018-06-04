import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');

const taskSchema = new schema.Entity('tasks');
const assignmentSchema = new schema.Entity(
  'assignments',
  {},
  {
    idAttribute: 'jobId',
  },
);

const authResponseSchema = {
  assignments: [assignmentSchema],
};

export {
  jobSchema,
  assignmentSchema,
  taskSchema,

  authResponseSchema,
};
