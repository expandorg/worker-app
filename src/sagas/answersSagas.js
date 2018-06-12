import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '../common/app/apiCallSaga';
import { answersActionTypes } from './actionTypes';

import { answersApi } from '../api/AnswersApi';
import { answersSchema, questionSchema } from '../model/schemas';

export const fetchAnswer = jobId => ({
  type: answersActionTypes.FETCH,
  payload: { jobId },
  meta: { schema: { answers: answersSchema, questions: questionSchema } },
});

const watchGetRequest = takeEveryApiCall(answersActionTypes.FETCH, answersApi.fetch);

export const startTest = jobId => ({
  type: answersActionTypes.START,
  payload: { jobId },
  meta: { schema: { answers: answersSchema, questions: questionSchema } },
});

const watchStartRequest = takeEveryApiCall(answersActionTypes.START, answersApi.start);

export const postAnswer = ({ jobId, index, answer }) => ({
  type: answersActionTypes.ANSWER,
  payload: { jobId, index, answer },
  meta: { schema: { answers: answersSchema, questions: questionSchema } },
});

const watchAnswerRequest = takeEveryApiCall(answersActionTypes.ANSWER, answersApi.answer);

export const cancelTest = ({ jobId, index }) => ({
  type: answersActionTypes.CANCEL,
  payload: { jobId, index },
  meta: { schema: { answers: answersSchema, questions: questionSchema } },
});

const watchCancelRequest = takeEveryApiCall(answersActionTypes.CANCEL, answersApi.cancel);

export function* answersSagas() {
  yield fork(watchGetRequest);
  yield fork(watchStartRequest);
  yield fork(watchAnswerRequest);
  yield fork(watchCancelRequest);
}
