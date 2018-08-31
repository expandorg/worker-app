// @flow
import { type ReduxAction } from './types.flow';

export type RequestStateType = {
  state: 'NotFetched' | 'Fetching' | 'Fetched' | 'FetchError',
  error?: ?{ [key: string]: string },
};

export const RequestStates = {
  NotFetched: 'NotFetched',
  Fetching: 'Fetching',
  Fetched: 'Fetched',
  FetchError: 'FetchError',
};

export const initialState: RequestStateType = {
  state: RequestStates.NotFetched,
  error: null,
};

export const requestUiStateReducer = (
  actionType: string,
  preservePayload: boolean = false,
  foldErrors: boolean = false
) => (
  state: RequestStateType = initialState,
  action: ReduxAction
): RequestStateType => {
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
      const commonMessage =
        !message && foldErrors ? errors[Reflect.ownKeys(errors)[0]] : message;
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
