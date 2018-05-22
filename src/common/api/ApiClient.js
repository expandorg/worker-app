import ApiError from './ApiError';

export default class ApiClient {
  constructor(apiUrl, request) {
    this.apiUrl = apiUrl;
    this.request = request;
  }

  get = (url, query) =>
    this.request.get(`${this.apiUrl}${url}`, query)
      .then(this.processResponse)

  post = (url, payload) =>
    this.request.post(`${this.apiUrl}${url}`, payload)
      .then(this.processResponse)

  postForm = (url, payload) =>
    this.request.postForm(`${this.apiUrl}${url}`, payload)
      .then(this.processResponse)

  processResponse = async (response) => {
    let json = null;
    try {
      json = await response.json();
    } catch (e) {
      throw new ApiError(e, 500);
    }

    if (json.error) {
      throw new ApiError(json.error, response.status);
    }
    if (response.status < 200 || response.status >= 400) {
      throw new ApiError(json, response.status);
    }
    return json;
  }
}
