import { fork } from 'redux-saga/effects';
import authSaga from './auth';
import web3Saga from './web3';

export default function* () {
  yield fork(authSaga);
  yield fork(web3Saga);
}

