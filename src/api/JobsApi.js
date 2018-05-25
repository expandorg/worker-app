import BaseApi from '../common/api/BaseApi';

export class JobsApi extends BaseApi {
  fetch = () =>
    this.get('/jobs').then(response => response.map(({ job }) => job))

  assign = ({ jobId }) =>
    this.post(`/jobs/${jobId}/assign`)
}

export const jobsApi = new JobsApi();
