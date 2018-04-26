import 'whatwg-fetch';
import { encodeUrlParams } from '../utils';

export default class ApiRequest {
  getRequestHeaders() {
    return new Headers({
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    });
  }

  get = (url, query) =>
    fetch(`${url}?${encodeUrlParams(query)}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: this.getRequestHeaders(),
    })

  post = (url, payload) =>
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: this.getRequestHeaders(),
      body: JSON.stringify(payload),
    })
}
