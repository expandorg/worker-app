import { BaseApi } from '@gemsorg/api-client';

export class ResponsesApi extends BaseApi {
  verify = ({ responseId, score }) =>
    this.post(`/responses/${responseId}/verify`, { score });
}

export const responsesApi = new ResponsesApi();
