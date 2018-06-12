import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { questionsActionTypes } from './actionTypes';

import { questionsApi } from '../api/QuestionsApi';
import { questionSchema } from '../model/schemas';

export const fetchQuestion = jobId => ({
  type: questionsActionTypes.FETCH,
  payload: { jobId },
  meta: { schema: questionSchema },
});

const watchGetRequest = takeEveryApiCall(questionsActionTypes.FETCH, questionsApi.fetch);

export const submitTask = (questionId, body) => ({
  type: questionsActionTypes.SUBMIT,
  payload: { questionId, body },
  meta: { schema: questionSchema },
});

const watchCreateRequest = takeEveryApiCall(
  questionsActionTypes.SUBMIT, questionsApi.submitQuestion);

export function* questionsSagas() {
  yield fork(watchGetRequest);
  yield fork(watchCreateRequest);
}
