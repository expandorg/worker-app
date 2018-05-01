import { actions } from '../actions/action-types';

export default function gemsBalanceReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_GEMS_BALANCE:
      return action.payload;
    default:
      break;
  }
  return state;
}
