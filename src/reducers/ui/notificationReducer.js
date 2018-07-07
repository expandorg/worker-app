import { appActionTypes } from '../../sagas/actionTypes';

export default function notificationReducer(state = null, action) {
  switch (action.type) {
    case appActionTypes.NOTIFICATION_ADD:
      return action.payload;
    case appActionTypes.NOTIFICATION_REMOVE:
      return null;
    default:
      break;
  }
  return state;
}
