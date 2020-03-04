// @flow
import { BaseApi } from '@expandorg/api-client';

export class DisputeApi extends BaseApi {
  workerDisputes = () => this.get('/workers/disputes');

  // eslint-disable-next-line camelcase
  createDispute = ({ response_id, dispute_message }: Object) =>
    this.post('/disputes', { response_id, dispute_message });
}

export const disputeApi = new DisputeApi();
