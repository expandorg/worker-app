import { gemsActionTypes } from '../sagas/actionTypes';

export default function transactionsReducer(state = null, action) {
  switch (action.type) {
    case gemsActionTypes.SET_TRANSACTIONS:
      return action.payload;
    case gemsActionTypes.WITHDRAW_COMPLETE:
      return action.payload.tx;
    default:
      break;
  }
  return state;
}
