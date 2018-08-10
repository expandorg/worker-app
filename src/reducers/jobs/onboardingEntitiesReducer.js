import { onboardingActionTypes } from '../../sagas/actionTypes';
import normiziedItemsReducer from '../../common/app/normiziedItemsReducer';

const normalizedOnboarding = normiziedItemsReducer('onboarding');

export default function onboardingEntitiesReducer(state = {}, action) {
  switch (action.type) {
    case onboardingActionTypes.REMOVE_MESSAGE: {
      const { jobId } = action.payload;
      if (state[jobId]) {
        return { ...state, [jobId]: { ...state[jobId], message: null } };
      }
      break;
    }
    default:
      break;
  }
  return normalizedOnboarding(state, action);
}
