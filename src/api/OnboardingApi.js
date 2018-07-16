import BaseApi from '../common/api/BaseApi';
import { mock } from './__tests__/onboardingMocks';

export class OnboardingApi extends BaseApi {
  fetch = ({ jobId }) =>
    this.success(mock.fetch(jobId))

  submit = ({ jobId, pageId, response }) =>
    this.success(mock.submit(jobId, pageId, response))
}

export const onboardingApi = new OnboardingApi();
