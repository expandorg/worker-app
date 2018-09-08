import ApiError from './ApiError';

export default class ApiClient {
  constructor(apiUrl, request) {
    this.apiUrl = apiUrl;
    this.request = request;
  }

  get = (url, query) =>
    this.request.get(`${this.apiUrl}${url}`, query).then(this.processResponse);

  post = (url, payload) =>
    this.request
      .post(`${this.apiUrl}${url}`, payload)
      .then(this.processResponse);

  processResponse = async response => {
    const text = await response.text();
    let json = null;
    try {
      json = text.length ? JSON.parse(text) : null;
    } catch (e) {
      throw new ApiError(e.message, 500);
    }

    if (json && json.error) {
      throw new ApiError(json.error, response.status);
    }
    if (response.status < 200 || response.status >= 400) {
      throw new ApiError(json, response.status);
    }
    return json;
  };
}
