import BaseApi from '../common/api/BaseApi';

export class JobsApi extends BaseApi {
  getJob = ({ jobId }) =>
    this.get(`/jobs/${jobId}`)

  fetch = () =>
    this.get('/jobs')

  assign = ({ jobId }) =>
    this.post(`/jobs/${jobId}/assign`)
}

export const jobsApi = new JobsApi();
