import { web3ActionTypes } from '../../sagas/actionTypes';
import { MetamaskState } from '../../model/enums';

const initialState = MetamaskState.NotInstalled;

export default function metamaskReducer(state = initialState, action) {
  switch (action.type) {
    case web3ActionTypes.INIT_WEB3_FAILED:
      return initialState;
    case web3ActionTypes.INIT_WEB3_COMPLETE:
      return MetamaskState.NotAuthorized;
    case web3ActionTypes.INIT_GEMS:
      return MetamaskState.NotAuthorized;
    case web3ActionTypes.INIT_GEMS_COMPLETE:
      return MetamaskState.Authorized;
    default:
      break;
  }
  return state;
}
