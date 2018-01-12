import { takeLatest, call, put, select } from 'redux-saga/effects';
import { promisify } from 'bluebird';
import getWeb3 from '../lib/web3';
import { fetchAuth, logIn } from '../lib/apis';
import { selectIsAuthenticated } from '../selectors/select-auth';
import {
  onLogin,
  onLoginError,
  onLoginSuccess,

  refreshLogin,
  refreshLoginSuccess,
  refreshLoginError,
} from '../actions/auth';

export function* handleRefreshLogin() {
  try {
    const res = yield call(fetchAuth);

    yield put(refreshLoginSuccess(res));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    if (yield select(selectIsAuthenticated)) {
      yield put(refreshLoginError());
    }
  }
}

export function* handleOnLogin() {
  try {
    const web3 = getWeb3();

    const [address] = web3.eth.accounts;

    const message = [{
      type: 'address',
      name: 'address',
      value: address,
    }];

    const sendAsync = yield call(
      promisify,
      web3.currentProvider.sendAsync.bind(web3.currentProvider),
    );

    const response = yield call(sendAsync, {
      method: 'eth_signTypedData',
      params: [
        message,
        address,
      ],
      from: address,
    });

    const res = yield call(logIn, address, response.result);

    yield put(onLoginSuccess(res));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    yield put(onLoginError(err));
  }
}

export default function* () {
  yield takeLatest(refreshLogin.getType(), handleRefreshLogin);
  yield takeLatest(onLogin.getType(), handleOnLogin);
}
