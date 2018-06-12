import BaseApi from '../common/api/BaseApi';

export class QuestionsApi extends BaseApi {
  fetch = ({ jobId }) =>
    this.get(`/job/${jobId}/questions`)

  submitQuestion = ({ jobId }, body) =>
    this.post(`/job/${jobId}/questions`, body)
}

export const questionsApi = new QuestionsApi();
