import { BaseApi } from '@expandorg/api-client';

export class JobsApi extends BaseApi {
  list = () => this.get('/jobs');

  fetch = ({ jobId }) => this.get(`/jobs/${jobId}`);

  fetchPreview = ({ jobId }) => this.get(`/jobs/${jobId}/preview`);

  assign = ({ jobId }) => this.post(`/jobs/${jobId}/assign`);
}

export const jobsApi = new JobsApi();
