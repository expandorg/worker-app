// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { validateForm } from '@gemsorg/components/src/common/validation';

import ApiError from '../api/ApiError';

export const apiCallSaga = (
  actionType: string,
  asyncCall: () => Promise<any>
) => {
  function* request({ payload, meta }: ReduxAction): Iterable<any> {
    try {
      if (meta && meta.validation) {
        const validationErrors = validateForm(payload, meta.validation);
        if (validationErrors) {
          throw ApiError.validation(validationErrors);
        }
      }
      let result = yield call(asyncCall, payload);

      if (meta && meta.schema) {
        result = normalize(result, meta.schema);
      }
      yield put({
        type: `${actionType}_COMPLETE`,
        payload: result,
        complete: true,
        meta,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: `${actionType}_FAILED`,
        payload: error,
        failed: true,
        meta,
      });
    }
  }
  return request;
};

export const takeEveryApiCall = (
  actionType: string,
  asyncCall: () => Promise<any>
) => {
  const request = apiCallSaga(actionType, asyncCall);
  function* watchGenerator(): Iterable<any> {
    yield takeEvery(actionType, request);
  }
  return watchGenerator;
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));
