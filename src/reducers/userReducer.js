import { userReducer as reducer } from '@expandorg/app-auth';
import { gemsActionTypes } from '@expandorg/app-gemtokens';
import { accountActionTypes } from '@expandorg/app-account';
import { userActionTypes } from '@expandorg/app-utils/app';

import {
  jobsActionTypes,
  tasksActionTypes,
  assignmentActionTypes,
  onboardingActionTypes,
} from '../sagas/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case accountActionTypes.ASSIGN_ADDRESS_COMPLETE:
    case accountActionTypes.CONFIRM_EMAIL_COMPLETE:
    case accountActionTypes.EDIT_EMAIL_COMPLETE:
      return action.payload.user;

    case userActionTypes.UPDATED:
      return action.payload.data.user;

    case jobsActionTypes.ASSIGN_TASK_COMPLETE:
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
