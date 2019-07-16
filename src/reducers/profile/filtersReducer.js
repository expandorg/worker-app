import { profileActionTypes } from '../../sagas/actionTypes';

export default function filtersReducer(state = null, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_FILTERS_COMPLETE: {
      return action.payload;
    }
    default:
      break;
  }
  return state;
}
