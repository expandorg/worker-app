import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';
import { profileActionTypes } from './actionTypes';

import { profileApi } from '../api/ProfileApi';

export const getProfile = () => ({
  type: profileActionTypes.FETCH,
  payload: {},
  asyncCall: profileApi.getUserProfile,
});

export const getAllFilters = () => ({
  type: profileActionTypes.FETCH_FILTERS,
  payload: {},
  asyncCall: profileApi.getAllFilters,
});

export const saveProfile = profile => ({
  type: profileActionTypes.SAVE,
  payload: { profile },
  asyncCall: profileApi.createWorkerProfile,
});

export const fetchSummary = () => ({
  type: profileActionTypes.SUMMARY,
  payload: {},
  asyncCall: profileApi.summary,
});

export const fetchTaskHistory = (cursor = null) => ({
  type: profileActionTypes.FETCH_TASK_HISTORY,
  payload: { cursor, limit: 10 },
  asyncCall: profileApi.taskHistory,
  meta: { params: { cursor } },
});

export function* profileSagas() {
  yield takeEvery(
    [
      profileActionTypes.SAVE,
      profileActionTypes.FETCH,
      profileActionTypes.FETCH_FILTERS,
      profileActionTypes.SUMMARY,
      profileActionTypes.FETCH_TASK_HISTORY,
    ],
    handleAsyncCall
  );
}
