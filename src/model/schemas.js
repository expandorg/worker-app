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
  responseSchema,
  questionSchema,
  answersSchema,
  authResponseSchema,
};
