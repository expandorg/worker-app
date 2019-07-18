// @flow
import { BaseApi } from '@expandorg/api-client';

export class ProfileApi extends BaseApi {
  getUserProfile = () => this.get('/workers/profile');

  getAllFilters = () => this.get('/filters');

  createWorkerProfile = ({ profile }: Object) =>
    this.post('/workers/profile', profile);
}

export const profileApi = new ProfileApi();
