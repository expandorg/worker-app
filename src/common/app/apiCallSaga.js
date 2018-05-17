import { call, put, takeEvery } from 'redux-saga/effects';
import { validate } from '../validation';

export const apiCallSaga = (actionType, asyncCall) => {
  function* request({ payload, meta }) {
    try {
      if (meta && meta.validation) {
        validate(payload, meta.validation);
      }
      const result = yield call(asyncCall, payload);
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
