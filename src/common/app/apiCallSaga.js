// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { validate } from '../validation';

export type ReduxAction = {
  type: string,
  payload: any,
  meta: ?{
    validation?: Object,
    schema?: Object,
    params?: Object
  },
  [key: string]: any
}

export const apiCallSaga = (actionType: string, asyncCall: () => Promise<any>) => {
  function* request({ payload, meta }: ReduxAction): Iterable<any> {
    try {
      if (meta && meta.validation) {
        validate(payload, meta.validation);
      }
      let result = yield call(asyncCall, payload);

      if (meta && meta.schema) {
        result = normalize(result, meta.schema);
      }

      yield put({ type: `${actionType}_COMPLETE`, payload: result, meta });
    } catch (error) {
      console.log(error);
      yield put({ type: `${actionType}_FAILED`, payload: error, meta });
    }
  }
  return request;
};

export const takeEveryApiCall = (actionType: string, asyncCall: () => Promise<any>) => {
  const request = apiCallSaga(actionType, asyncCall);
  function* watchGenerator(): Iterable<any> {
    yield takeEvery(actionType, request);
  }
  return watchGenerator;
};
