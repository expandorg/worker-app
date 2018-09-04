import BaseApi from '../common/api/BaseApi';

export class OnboardingApi extends BaseApi {
  fetch = ({ jobId }) => this.get(`/jobs/${jobId}/onboarding`);

  submit = ({ jobId, response }) =>
    this.post(`/jobs/${jobId}/onboarding`, { response });
}

export const onboardingApi = new OnboardingApi();
