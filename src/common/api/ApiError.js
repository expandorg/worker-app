// @flow

export default class ApiError extends Error {
  httpStatus: number;
  errors: ?Object;

  constructor(message: ?string, httpStatus: number = 500, errors: ?Object) {
    super(message);
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ApiError);
    } else {
      this.stack = new Error(message).stack;
    }
    this.name = 'ApiError';
    this.httpStatus = httpStatus;
    this.errors = errors;
  }

  static validation(errors: ?Object) {
    return new ApiError(undefined, 400, errors);
  }
}
