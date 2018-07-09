// @flow
import EventSourceDefinition from './EventSourceDefinition';

import { userUpdated } from '../../sagas/userSagas';

export default class UserEventSource extends EventSourceDefinition {
  constructor() {
    super({
      user: userUpdated,
    });
  }

  getUrl = (backendAddress: string, { userId }: ?Object) =>
    `${backendAddress}/users/${userId}/subscribe`
}
