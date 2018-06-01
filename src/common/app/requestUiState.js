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

export const requestUiStateReducer = (actionType, preservePayload = false) =>
  (state = initialState, action) => {
    switch (action.type) {
      case actionType:
        return { ...initialState, state: RequestStates.Fetching };
      case `${actionType}_COMPLETE`: {
        return {
          ...initialState,
          state: RequestStates.Fetched,
          payload: preservePayload ? action.payload : undefined,
        };
      }
      case `${actionType}_FAILED`: {
        return { state: RequestStates.FetchError, error: action.payload.responseStatus };
      }
      default:
        break;
    }
    return state;
  };
