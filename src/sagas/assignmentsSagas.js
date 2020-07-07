import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';
import { authResponseSchema } from '@expandorg/app-auth';

import { assignmentActionTypes } from './actionTypes';

import { assignmentsApi } from '../api/AssignmentsApi';

export const reportAssignment = (id, reason, message) => ({
  type: assignmentActionTypes.REPORT,
  payload: { id, reason, message },
  asyncCall: assignmentsApi.report,
  meta: {
    schema: authResponseSchema,
  },
});

export const cancelAssignment = (id) => ({
  type: assignmentActionTypes.CANCEL,
  payload: { id },
  asyncCall: assignmentsApi.cancel,
  meta: {
    schema: authResponseSchema,
  },
});

export function* assignmentsSagas() {
  yield takeEvery(
    [assignmentActionTypes.REPORT, assignmentActionTypes.CANCEL],
    handleAsyncCall
  );
}
