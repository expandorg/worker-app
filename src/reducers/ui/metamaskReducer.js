import { actions } from '../../actions/action-types';

export default function metamaskReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_METAMASK:
      return action.payload;
    default:
      break;
  }
  return state;
}
