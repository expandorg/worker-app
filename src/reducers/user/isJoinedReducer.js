import { actions } from '../../actions/action-types';

export default function isJoinedReducer(state = false, action) {
  switch (action.type) {
    case actions.SET_IS_JOINED:
      return action.payload;
    default:
      break;
  }
  return state;
}
