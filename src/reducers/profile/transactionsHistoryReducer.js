import { transactionActionTypes } from '../../sagas/actionTypes';

const initialState = {
  txs: [],
  next: null,
  prev: null,
};

export default function transactionsListReducer(state = initialState, action) {
  switch (action.type) {
    case transactionActionTypes.FETCH_LIST_COMPLETE: {
      const { payload, meta } = action;

      const txs = meta.params.cursor
        ? [...state.txs, ...payload.transactions]
        : payload.transactions;

      return {
        ...state,
        txs,
        next: payload.next_cursor,
        prev: payload.previous_cursor,
      };
    }
    default:
      break;
  }
  return state;
}
