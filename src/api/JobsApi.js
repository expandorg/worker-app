import BaseApi from '../common/api/BaseApi';
import { mock } from './__tests__/onboardingMocks';

export class JobsApi extends BaseApi {
  list = () =>
    this.get('/jobs').then((data) => {
      data.jobs(job => mock.inject(job));
      return data;
    })

  fetch = ({ jobId }) =>
    this.get(`/jobs/${jobId}`).then((data) => {
      mock.inject(data.job);
      return data;
    })

  assign = ({ jobId }) =>
    this.post(`/jobs/${jobId}/assign`)
}

export const jobsApi = new JobsApi();
