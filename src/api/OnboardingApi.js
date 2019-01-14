import { BaseApi } from '@expandorg/api-client';

export class OnboardingApi extends BaseApi {
  fetch = ({ jobId }) => this.get(`/jobs/${jobId}/onboarding`);

  submit = ({ jobId, response }) =>
    this.post(`/jobs/${jobId}/onboarding`, { response });

  report = ({ jobId, reason, message }) =>
    this.post(`/jobs/${jobId}/onboarding/report`, { reason, message });
}

export const onboardingApi = new OnboardingApi();
