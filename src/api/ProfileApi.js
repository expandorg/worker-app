// @flow
import { BaseApi } from '@expandorg/api-client';

export class ProfileApi extends BaseApi {
  getUserProfile = () => this.get('/workers/profile');

  getAllFilters = () => this.get('/filters');

  createWorkerProfile = ({ profile }: Object) =>
    this.post('/workers/profile', profile);

  summary = () => this.get('/profiles/summary');

  taskHistory = ({ cursor, status, order, limit }: Object) =>
    this.get('/profiles/task-history', { cursor, status, order, limit });

  taskHistoryById = ({ id }: Object) => this.get(`/profiles/responses/${id}`);

  transactionHistory = ({ cursor }: Object) =>
    this.get(`/profiles/transaction-history`, { cursor });
}

export const profileApi = new ProfileApi();
