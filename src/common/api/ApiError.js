export default class ApiError extends Error {
  constructor(responseStatus, httpStatus = 500) {
    super();
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ApiError);
    } else {
      this.stack = (new Error(responseStatus)).stack;
    }
    this.name = 'ApiError';
    this.responseStatus = responseStatus;
    this.httpStatus = httpStatus;
  }
}
