import { actions } from '../../actions/action-types';

export default function lockedReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_METAMASK_LOCKED:
      return action.payload;
    default:
      break;
  }
  return state;
}
