import { takeLatest, call, put } from 'redux-saga/effects';
import { initWeb3, watchForMetaMaskUnlock } from '../lib/web3';
import { initWeb3 as initWeb3Action, onWeb3StateChange } from '../actions/web3';

// // Will wait until web3 is installed and attempt to unlock metamask.
// export function* handleInstalledWeb3() {

// }

export function* handleInitWeb3() {
  const installed = yield call(initWeb3);

  yield put(onWeb3StateChange({ installed }));

  if (installed) {
    // yield call(handleInstalledWeb3);
    yield call(watchForMetaMaskUnlock);

    yield put(onWeb3StateChange({ locked: false }));
  }
}

export default function* () {
  yield takeLatest(initWeb3Action.getType(), handleInitWeb3);
}
