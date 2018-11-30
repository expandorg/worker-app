import { userReducer as reducer } from '@gemsorg/app-auth';

import {
  userActionTypes,
  jobsActionTypes,
  tasksActionTypes,
  assignmentActionTypes,
  gemsActionTypes,
  onboardingActionTypes,
} from '../sagas/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.ASSIGN_ADDRESS_COMPLETE:
    case userActionTypes.CONFIRM_EMAIL_COMPLETE:
    case userActionTypes.EDIT_EMAIL_COMPLETE:
      return action.payload.user;

    case userActionTypes.UPDATED:
      return action.payload.data.user;

    case jobsActionTypes.ASSIGN_COMPLETE:
      return action.payload.result.user;

    case onboardingActionTypes.REPORT_COMPLETE:
      return action.payload.result.user;

    case tasksActionTypes.SUBMIT_COMPLETE:
      return action.payload.result.user;

    case assignmentActionTypes.REPORT_COMPLETE:
    case assignmentActionTypes.CANCEL_COMPLETE:
      return action.payload.result.user;

    case gemsActionTypes.WITHDRAW_COMPLETE:
    case gemsActionTypes.DEPOSIT_COMPLETE:
      return action.payload.user;

    default:
      break;
  }
  return reducer(state, action);
}
