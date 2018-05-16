import settings from '../settings';

import ApiClient from './ApiClient';
import ApiRequest from './ApiRequest';

const defaultClient = new ApiClient(settings.apiUrl, new ApiRequest());

export default class BaseApi {
  constructor(client = defaultClient) {
    this.client = client;
  }

  get = (...args) =>
    this.client.get(...args)

  post = (...args) =>
    this.client.post(...args)

  postForm = (...args) =>
    this.client.postForm(...args)

  success = data =>
    Promise.resolve(data)
}
