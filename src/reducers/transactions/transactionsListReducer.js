import { transactionActionTypes } from '../../sagas/actionTypes';

// const initialState = [
//   { id: '1', type: 'deposit', date: 'today', url: 'http://asd.ru' },
//   { id: '2', type: 'withdrawal', date: 'today', url: 'http://asd.ru' },
//   { id: '3', type: 'deposit', date: 'today', url: 'http://asd.ru' },
//   { id: '4', type: 'deposit', date: 'today', url: 'http://asd.ru' },
// ];

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
