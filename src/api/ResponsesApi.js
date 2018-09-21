import { BaseApi } from '@gemsorg/api-client';

export class ResponsesApi extends BaseApi {
  verify = ({ taskId, score }) =>
    this.post(`/tasks/${taskId}/verify`, { score });
}

export const responsesApi = new ResponsesApi();
