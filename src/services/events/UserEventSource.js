// @flow
import EventSourceDefinition from './EventSourceDefinition';

import { userUpdated } from '../../sagas/userSagas';
import { transactionFailed } from '../../sagas/gemsSagas';

export default class UserEventSource extends EventSourceDefinition {
  constructor() {
    super({
      user: userUpdated,
      'tx-failure': transactionFailed,
    });
  }

  getUrl = (backendAddress: string, params: ?Object) => {
    if (!params) {
      throw new Error('params.userId is missing');
    }
    return `${backendAddress}/users/${params.userId}/subscribe`;
  }
}
