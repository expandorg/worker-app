// @flow
import EventSourceDefinition from './EventSourceDefinition';

import { userUpdated } from '../../sagas/userSagas';
import { transactionFailed } from '../../sagas/gemsSagas';

export default class TxEventSource extends EventSourceDefinition {
  constructor() {
    super({
      user: userUpdated,
      'tx-failure': transactionFailed,
    });
  }

  getUrl = (backendAddress: string, params: ?Object) => {
    if (!params || !params.tx) {
      throw new Error('params.tx is missing');
    }
    return `${backendAddress}/transactions/subscribe?tx=${params.tx}`;
  };
}
