import { BaseApi } from '@expandorg/api-client';

export class ResponsesApi extends BaseApi {
  verify = ({ responseId, score, reason }) =>
    this.post(`/responses/${responseId}/verify`, { score, reason });
}

export const responsesApi = new ResponsesApi();
