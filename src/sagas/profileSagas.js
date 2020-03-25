import { takeEvery, put } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';
import { profileActionTypes } from './actionTypes';

import { profileApi } from '../api/ProfileApi';
import { disputeApi } from '../api/DisputeApi';
import { disputeSchema } from '../model/schemas';

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

export const saveProfile = (profile) => ({
  type: profileActionTypes.SAVE,
  payload: { profile },
  asyncCall: profileApi.createWorkerProfile,
});

export const fetchSummary = () => ({
  type: profileActionTypes.SUMMARY,
  payload: {},
  asyncCall: profileApi.summary,
});

export const fetchTaskHistory = (
  cursor = null,
  status = null,
  order = null
) => ({
  type: profileActionTypes.FETCH_TASK_HISTORY,
  payload: { cursor, status, order, limit: 10 },
  asyncCall: profileApi.taskHistory,
  meta: { params: { cursor } },
});

export const fetchTaskHistoryEntity = (id) => ({
  type: profileActionTypes.FETCH_TASK_HISTORY_BY_ID,
  payload: { id },
  asyncCall: profileApi.taskHistoryById,
});

export const fetchDisputes = () => ({
  type: profileActionTypes.FETCH_DISPUTES,
  payload: {},
  asyncCall: disputeApi.workerDisputes,
  meta: { schema: { disputes: [disputeSchema] } },
});

export const startDispute = (responseId, message) => ({
  type: profileActionTypes.START_DISPUTE,
  payload: { response_id: responseId, dispute_message: message },
  asyncCall: disputeApi.createDispute,
});

function* handleDisputeStarted() {
  yield put(fetchDisputes());
}

export function* profileSagas() {
  yield takeEvery(
    [
      profileActionTypes.SAVE,
      profileActionTypes.FETCH,
      profileActionTypes.FETCH_FILTERS,
      profileActionTypes.SUMMARY,
      profileActionTypes.FETCH_TASK_HISTORY,
      profileActionTypes.FETCH_TASK_HISTORY_BY_ID,
      profileActionTypes.START_DISPUTE,
      profileActionTypes.FETCH_DISPUTES,
    ],
    handleAsyncCall
  );

  yield takeEvery(
    profileActionTypes.START_DISPUTE_COMPLETE,
    handleDisputeStarted
  );
}
