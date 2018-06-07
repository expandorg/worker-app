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

export const requestUiStateReducer = (actionType, preservePayload = false, foldErrors = false) =>
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
        const { errors, message } = action.payload;
        const commonMessage = (!message && foldErrors)
          ? errors[Reflect.ownKeys(errors)[0]]
          : message;
        return {
          state: RequestStates.FetchError,
          error: { ...errors, commonMessage },
        };
      }
      default:
        break;
    }
    return state;
  };
