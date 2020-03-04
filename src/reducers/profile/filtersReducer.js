import { profileActionTypes } from '../../sagas/actionTypes';

const initialState = {
  Education: [],
  Interest: [],
  Language: [],
  Availability: [],
};

export default function profileFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case profileActionTypes.FETCH_FILTERS_COMPLETE: {
      const { Education, Interest, Language, Availability } = action.payload;
      return {
        ...state,
        Education: Education || [],
        Interest: Interest || [],
        Language: Language || [],
        Availability: Availability || [],
      };
    }
    default:
      break;
  }
  return state;
}
