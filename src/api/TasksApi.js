import { BaseApi } from '@expandorg/api-client';

export class TasksApi extends BaseApi {
  fetch = ({ taskId }) => this.get(`/tasks/${taskId}`);

  submitTask = ({ taskId, response }) =>
    this.post(`/tasks/${taskId}/submit`, { response });

  report = ({ taskId, reason, message }) =>
    this.post(`/tasks/${taskId}/report`, { reason, message });

  cancel = ({ taskId }) => this.post(`/tasks/${taskId}/cancel`);
}

export const tasksApi = new TasksApi();
