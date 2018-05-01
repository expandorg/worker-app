import { actions, gemsActionTypes } from '../actions/action-types';

export default function transactionsReducer(state = null, action) {
  switch (action.type) {
    case actions.SET_TRANSACTIONS:
      return action.payload;
    case gemsActionTypes.WITHDRAW_COMPLETE:
      return action.payload.tx;
    default:
      break;
  }
  return state;
}
