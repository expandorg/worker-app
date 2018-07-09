import { appActionTypes } from '../../sagas/actionTypes';

const initialState = null;

export default function notificationReducer(state = initialState, action) {
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
