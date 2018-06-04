import { takeEvery, fork, call, put } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { userActionTypes } from './actionTypes';

import { gemsService } from '../services/GemsService';
import { userApi } from '../api/UserApi';

export const editEmail = (user, email) => ({
  type: userActionTypes.EDIT_EMAIL,
  payload: { userId: user.id, email },
});

const watchEditEmail = takeEveryApiCall(userActionTypes.EDIT_EMAIL, userApi.editEmail);

export const confirmEmail = (user, code) => ({
  type: userActionTypes.CONFIRM_EMAIL,
  payload: { userId: user.id, code },
});

const watchConfirmEmail = takeEveryApiCall(userActionTypes.CONFIRM_EMAIL, userApi.confirmEmail);

export const resendConfirmEmail = user => ({
  type: userActionTypes.RESEND_CONFIRM_EMAIL,
  payload: { userId: user.id },
});

const watchResendConfirm = takeEveryApiCall(
  userActionTypes.RESEND_CONFIRM_EMAIL,
  userApi.resendConfirmEmail,
);


export const assignAddress = (user, address = null) => ({
  type: userActionTypes.ASSIGN_ADDRESS,
  payload: { user, address },
});

function* handleAssignAddress({ payload: { user, address } }) {
  try {
    let params = { userId: user.id, address };
    if (!address) {
      const defaultAccount = gemsService.getDefaultAccount();
      const { result: signature } = yield call(gemsService.getAccountSingature, defaultAccount);
      params = { ...params, address: defaultAccount, signature };
    }
    const payload = yield call(userApi.assignAddress, params);

    yield put(({ type: userActionTypes.ASSIGN_ADDRESS_COMPLETE, payload }));
  } catch (error) {
    yield put(({ type: userActionTypes.ASSIGN_ADDRESS_FAILED, payload: error }));
  }
}


export function* userSagas() {
  yield takeEvery(userActionTypes.ASSIGN_ADDRESS, handleAssignAddress);

  yield fork(watchEditEmail);
  yield fork(watchConfirmEmail);
  yield fork(watchResendConfirm);
}
