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

const questionSchema = new schema.Entity('questions');
const answersSchema = new schema.Entity(
  'answers',
  {},
  {
    idAttribute: 'user_id',
  },
);

export {
  jobSchema,
  assignmentSchema,
  taskSchema,
  questionSchema,
  answersSchema,
  authResponseSchema,
};
