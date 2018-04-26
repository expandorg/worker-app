import 'whatwg-fetch';
import { encodeUrlParams } from '../utils';

export default class ApiRequest {
  getRequestHeaders(contentType = 'application/json') {
    const headers = new Headers({
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
    if (contentType !== null) {
      headers.append('Content-Type', contentType);
    }
    return headers;
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

  postForm = (url, body) =>
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: this.getRequestHeaders(null),
      body,
    })
}
