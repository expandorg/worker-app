// @flow

import { BaseApi, ApiClient, ApiRequest } from '@gemsorg/api-client';
import { ExpirationCache } from '@gemsorg/utils/cache';

const EXPIRE_IN = 5 * 60 * 1000; // 5 mins

class EthgasstationInfoClient extends ApiClient {
  constructor() {
    super(
      'https://ethgasstation.info',
      new ApiRequest({
        mode: 'cors',
        cache: 'no-cache',
        headers: new Headers({
          Accept: 'application/json',
        }),
      })
    );
  }
}

export class EthgasstationInfoApi extends BaseApi {
  static fallbackAvg: number = 200;

  cache: ExpirationCache = new ExpirationCache(EXPIRE_IN);

  getAverage = async () => {
    try {
      const data = await this.cache.invokeCached('data', this.fetchStats);
      return data.average;
    } catch (e) {
      return EthgasstationInfoApi.fallbackAvg;
    }
  };

  fetchStats = () => this.get('/json/ethgasAPI.json');
}

export const etheriumApi = new EthgasstationInfoApi(
  new EthgasstationInfoClient()
);
