// @flow
import { BaseApi } from '@expandorg/api-client';

export class ProfileApi extends BaseApi {
  getUserProfile = () => this.get('/workers/profile');

  getAllFilters = () => this.get('/filters');

  createWorkerProfile = ({ profile }: Object) =>
    this.post('/workers/profile', profile);

  summary = () => this.get('/profiles/summary');

  // eslint-disable-next-line camelcase
  taskHistory = ({ next_cursor, limit }: Object) =>
    this.get('/profiles/task-history', { next_cursor, limit });
}

export const profileApi = new ProfileApi();
