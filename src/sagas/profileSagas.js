import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { profileActionTypes } from './actionTypes';
import { profileApi } from '../api/ProfileApi';

export const getProfile = userId => ({
  type: profileActionTypes.FETCH,
  payload: { userId },
  asyncCall: profileApi.getUserProfile,
});

export const getAllFilters = () => ({
  type: profileActionTypes.FETCH_FILTERS,
  payload: {},
  asyncCall: profileApi.getAllFilters,
});

export const saveProfile = (userId, profile) => ({
  type: profileActionTypes.SAVE,
  payload: { userId, profile },
  asyncCall: profileApi.createWorkerProfile,
});

export function* profileSagas() {
  yield takeEvery(
    [
      profileActionTypes.SAVE,
      profileActionTypes.FETCH,
      profileActionTypes.FETCH_FILTERS,
    ],
    handleAsyncCall
  );
}
