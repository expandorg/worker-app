import { transactionActionTypes } from '../../sagas/actionTypes';

export default function transactionsListReducer(state = [], action) {
  switch (action.type) {
    case transactionActionTypes.FETCH_LIST_COMPLETE: {
      const { payload, meta } = action;
      if (!meta.page) {
        return payload.transactions || [];
      }
      return state.concat(payload.transactions || []);
    }
    default:
      break;
  }
  return state;
}
