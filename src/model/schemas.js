import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');

const taskSchema = new schema.Entity('tasks');

export {
  jobSchema,
  taskSchema,
};
