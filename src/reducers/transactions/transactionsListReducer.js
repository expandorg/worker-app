import { transactionActionTypes } from '../../sagas/actionTypes';

const initialState = [];

export default function transactionsListReducer(state = initialState, action) {
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
