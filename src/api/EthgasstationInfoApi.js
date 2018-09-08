// @flow

import BaseApi from '../common/api/BaseApi';
import ApiClient from '../common/api/ApiClient';
import ApiRequest from '../common/api/ApiRequest';

import ExpirationCache from '../common/cache/ExpirationCache';

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
