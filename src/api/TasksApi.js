import BaseApi from '../common/api/BaseApi';

export class TasksApi extends BaseApi {
  fetch = ({ taskId }) =>
    this.get(`/tasks/${taskId}`)

  submitTask = ({ submission }) =>
    this.post('/submit', submission)
}

export const tasksApi = new TasksApi();
