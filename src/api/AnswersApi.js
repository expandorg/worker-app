import BaseApi from '../common/api/BaseApi';

export class AnswersApi extends BaseApi {
  fetch = ({ jobId }) =>
    this.get(`/job/${jobId}/answers`)


  start = ({ jobId }) =>
    this.post(`/job/${jobId}/start`)

  answer = ({ jobId, index, answer }) =>
    this.post(`/job/${jobId}/answer`, { index, answer })

  cancel = ({ jobId, index }) =>
    this.post(`/job/${jobId}/cancel`, { index })
}

export const answersApi = new AnswersApi();
