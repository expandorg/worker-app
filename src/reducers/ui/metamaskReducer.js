import { appActionTypes } from '../../sagas/actionTypes';

export default function metamaskReducer(state = null, action) {
  switch (action.type) {
    case appActionTypes.INIT_WEB3_COMPLETE:
      return true;
    case appActionTypes.INIT_WEB3_FAILED:
      return false;
    default:
      break;
  }
  return state;
}
