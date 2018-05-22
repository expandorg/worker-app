import BaseApi from '../common/api/BaseApi';

export class JobsApi extends BaseApi {
  // Mocked tasks
  fetch = () =>
    this.success([{
      id: 0,
      title: 'Trivia Question and Answer Creation',
      requester: 'Stream Live Inc',
      imageUrl: '/images/trivia-screen.png',
      description: 'Write a trivia question with three multiple-choice answers. One answer should be correct and fact-checked, and two answers should be incorrect.',
    }])
    // this.get(`/jobs`)

  assign = ({ jobId }) =>
    this.post(`/jobs/${jobId}/assign`)
}

export const jobsApi = new JobsApi();
