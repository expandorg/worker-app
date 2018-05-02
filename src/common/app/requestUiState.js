import { keyMirror } from '../utils';

export const RequestStates = keyMirror({
  NotFetched: null,
  Fetching: null,
  Fetched: null,
  FetchError: null,
});

export const initialState = {
  state: RequestStates.NotFetched,
  error: null,
};

export const requestUiStateReducer = actionType =>
  (state = initialState, action) => {
    switch (action.type) {
      case actionType:
        return { ...initialState, state: RequestStates.Fetching };
      case `${actionType}_COMPLETE`: {
        return { ...initialState, state: RequestStates.Fetched }; }
      case `${actionType}_FAILED`: {
        return { state: RequestStates.FetchError, error: action.payload };
      }
      default:
        break;
    }
    return state;
  };
