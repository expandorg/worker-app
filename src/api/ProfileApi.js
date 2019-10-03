// @flow
import { BaseApi } from '@expandorg/api-client';

export class ProfileApi extends BaseApi {
  getUserProfile = () => this.get('/workers/profile');

  getAllFilters = () => this.get('/filters');

  createWorkerProfile = ({ profile }: Object) =>
    this.post('/workers/profile', profile);

  summary = () => this.get('/profiles/summary');

  taskHistory = ({ page }: Object) =>
    this.get('/profiles/task-history', { page: page || 0 });
}

export const profileApi = new ProfileApi();
