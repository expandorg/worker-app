import { BaseApi } from '@expandorg/api-client';

export class JobsApi extends BaseApi {
  list = () => this.get('/jobs');

  fetch = ({ jobId }) => this.get(`/jobs/${jobId}`);

  assign = ({ jobId }) => this.post(`/jobs/${jobId}/assign`);
}

export const jobsApi = new JobsApi();
