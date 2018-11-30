import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '@gemsorg/app-utils';
import { authResponseSchema } from '@gemsorg/app-auth';

import { assignmentActionTypes } from './actionTypes';

import { assignmentsApi } from '../api/AssignmentsApi';

export const reportAssignment = (id, reason, message) => ({
  type: assignmentActionTypes.REPORT,
  payload: { id, reason, message },
  meta: {
    schema: authResponseSchema,
  },
});

const watchReportRequest = takeEveryApiCall(
  assignmentActionTypes.REPORT,
  assignmentsApi.report
);

export const cancelAssignment = id => ({
  type: assignmentActionTypes.CANCEL,
  payload: { id },
  meta: {
    schema: authResponseSchema,
  },
});

const watchCancelRequest = takeEveryApiCall(
  assignmentActionTypes.CANCEL,
  assignmentsApi.cancel
);

export function* assignmentsSagas() {
  yield fork(watchReportRequest);
  yield fork(watchCancelRequest);
}
