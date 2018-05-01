import { actions } from '../../actions/action-types';

export default function isAuthorizedReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_IS_AUTHORIZED:
      return action.payload;
    default:
      break;
  }
  return state;
}
