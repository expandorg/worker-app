import { RequestStates } from '@gemsorg/app-utils';

import { gemsActionTypes, userActionTypes } from '../../sagas/actionTypes';

const initialState = RequestStates.NotFetched;

export default function txStateReucer(state = initialState, action) {
  switch (action.type) {
    case gemsActionTypes.WITHDRAW_COMPLETE:
    case gemsActionTypes.DEPOSIT_COMPLETE:
      return RequestStates.Fetching;
    case userActionTypes.UPDATED:
    case gemsActionTypes.TRANSACTION_FAILED:
      return initialState;
    default:
      break;
  }
  return state;
}
