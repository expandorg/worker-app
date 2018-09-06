import BaseApi from '../common/api/BaseApi';

export class OnboardingApi extends BaseApi {
  fetch = ({ jobId }) => this.get(`/jobs/${jobId}/onboarding`);

  submit = ({ jobId, response }) =>
    this.post(`/jobs/${jobId}/onboarding`, { response });

  report = ({ jobId, reason, message }) =>
    this.post(`/jobs/${jobId}/onboarding/report`, { reason, message });

  cancel = ({ jobId }) => this.post(`/jobs/${jobId}/onboarding/cancel`);
}

export const onboardingApi = new OnboardingApi();
