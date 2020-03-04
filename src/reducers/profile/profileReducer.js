import { profileActionTypes } from '../../sagas/actionTypes';

export default function profileReducer(state = null, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_COMPLETE:
      return action.payload;
    case profileActionTypes.SAVE_COMPLETE: {
      if (action.payload.message) {
        break;
      }
      return action.payload;
    }
    default:
      break;
  }
  return state;
}
