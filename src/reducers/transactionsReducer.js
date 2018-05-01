import { actions } from '../actions/action-types';

export default function transactionsReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_TRANSACTIONS:
      return action.payload;
    default:
      break;
  }
  return state;
}
