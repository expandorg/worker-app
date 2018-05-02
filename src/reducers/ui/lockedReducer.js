import { appActionTypes } from '../../sagas/actionTypes';

export default function lockedReducer(state = null, action) {
  switch (action.type) {
    case appActionTypes.INIT_GEMS:
      return true;
    case appActionTypes.INIT_GEMS_COMPLETE:
      return false;
    default:
      break;
  }
  return state;
}
