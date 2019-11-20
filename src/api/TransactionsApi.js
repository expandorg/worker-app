import { BaseApi } from '@expandorg/api-client';

export class TransactionsApi extends BaseApi {
  fetchList = ({ page }) => this.get(`/transactions/`, { page });
}

export const transactionsApi = new TransactionsApi();
