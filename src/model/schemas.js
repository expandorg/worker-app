import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');

const taskSchema = new schema.Entity('tasks');

const authResponseSchema = {
  assignedTasks: [taskSchema],
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
  taskSchema,
  questionSchema,
  answersSchema,
  authResponseSchema,
};
