import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { validate } from '../validation';

export const apiCallSaga = (actionType, asyncCall) => {
  function* request({ payload, meta }) {
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
      yield put({ type: `${actionType}_FAILED`, payload: error, meta });
    }
  }
  return request;
};

export const takeEveryApiCall = (actionType, asyncCall) => {
  const request = apiCallSaga(actionType, asyncCall);
  function* watchGenerator() {
    yield takeEvery(actionType, request);
  }
  return watchGenerator;
};
