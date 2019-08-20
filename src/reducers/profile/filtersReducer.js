import { profileActionTypes } from '../../sagas/actionTypes';

const initialState = {
  Education: [],
  Interest: [],
  Language: [],
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_FILTERS_COMPLETE: {
      return action.payload;
    }
    default:
      break;
  }
  return state;
}
