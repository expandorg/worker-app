// @flow
import 'whatwg-fetch';
import { encodeUrlParams } from '../utils';

const defaultSettings = {
  credentials: 'include',
  mode: 'cors',
  cache: 'no-cache',
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

export default class ApiRequest {
  requestSettings: Object

  constructor(requestSettings: Object = defaultSettings) {
    this.requestSettings = requestSettings;
  }

  get = (url: string, query?: Object) => {
    const params = query ? encodeUrlParams(query) : '';
    return fetch(`${url}${params && `?${params}`}`, {
      ...this.requestSettings,
      method: 'GET',
    });
  }


  post = (url: string, payload?: Object) =>
    fetch(url, {
      ...this.requestSettings,
      method: 'POST',
      body: JSON.stringify(payload),
    })
}
