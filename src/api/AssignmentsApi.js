import { BaseApi } from '@expandorg/api-client';

export class AssignmentsApi extends BaseApi {
  report = ({ id, reason, message }) =>
    this.post(`/assignments/${id}/report`, { reason, message });

  cancel = ({ id }) => this.post(`/assignments/${id}/cancel`);
}

export const assignmentsApi = new AssignmentsApi();
