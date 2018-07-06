import BaseApi from '../common/api/BaseApi';
import { mock } from './__tests__/onboardingMocks';

export class OnboardingApi extends BaseApi {
  fetchStatus = ({ jobId }) =>
    this.success(mock.fetchStatus(jobId))
    // this.get(`/job/${jobId}/onboarding`)


  submitStep = ({ jobId, stepId, response }) =>
    this.success(mock.submitStep(jobId, stepId, response))
    // this.post(`/job/${jobId}/onboarding`, { stepId, response })
}

export const onboardingApi = new OnboardingApi();
