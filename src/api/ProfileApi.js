// @flow
import { BaseApi } from '@expandorg/api-client';

export class ProfileApi extends BaseApi {
  getUserProfile = ({ userId }: Object) => this.get(`/users/profile/${userId}`);

  getAllFilters = () => this.post('/eligibility/filters');

  createWorkerProfile = ({ userId, profile }: Object) =>
    this.post(`/users/profile/${userId}`, profile);
}

export const profileApi = new ProfileApi();
