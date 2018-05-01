import { gemsActionTypes } from '../actions/action-types';

const initialState = null;

export default function gemsBalanceReducer(state = initialState, action) {
  switch (action.type) {
    case gemsActionTypes.FETCH_BALANCE:
      return initialState;
    case gemsActionTypes.FETCH_BALANCE_COMPLETE:
      return action.payload.balance;
    default:
      break;
  }
  return state;
}
