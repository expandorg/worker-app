// @flow
import { onboardingActionTypes } from '../../sagas/actionTypes';
import { type ReduxAction } from '../../common/app/types.flow';

import {
  initialState,
  RequestStates,
  requestUiStateReducer,
  type RequestStateType,
} from '../../common/app/requestUiState';

const submitStateReducer = requestUiStateReducer(onboardingActionTypes.SUBMIT);

export default function submitOnboardingReducer(
  state: RequestStateType = initialState,
  action: ReduxAction,
) {
  switch (action.type) {
    case onboardingActionTypes.SUBMIT_COMPLETE: {
      const { entities, result } = action.payload;
      const onboarding = entities.onboarding[result.onboarding];
      if (onboarding.message) {
        return {
          ...initialState,
          state: RequestStates.Fetched,
          error: { commonMessage: onboarding.message },
        };
      }
      break;
    }
    default:
      break;
  }
  return submitStateReducer(state, action);
}
