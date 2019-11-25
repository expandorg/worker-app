import { transactionActionTypes } from '../../sagas/actionTypes';

const initialState = {
  txs: [],
  fetching: false,
  next: null,
  prev: null,
};

export default function transactionsListReducer(state = initialState, action) {
  switch (action.type) {
    case transactionActionTypes.FETCH_LIST: {
      return { ...state, fetching: true };
    }
    case transactionActionTypes.FETCH_LIST_FAILED: {
      return { ...state, fetching: false };
    }
    case transactionActionTypes.FETCH_LIST_COMPLETE: {
      const { payload, meta } = action;

      const txs = meta.params.cursor
        ? [...state.txs, ...payload.transactions]
        : payload.transactions;

      return {
        ...state,
        txs,
        fetching: false,
        next: payload.next_cursor,
        prev: payload.previous_cursor,
      };
    }
    default:
      break;
  }
  return state;
}
