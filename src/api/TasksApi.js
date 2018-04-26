import BaseApi from '../common/api/BaseApi';

export class TasksApi extends BaseApi {
  submitTask = ({ submission }) =>
    this.post('/submit', submission)
}

export const tasksApi = new TasksApi();
