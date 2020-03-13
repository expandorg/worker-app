import { authActionTypes } from '@expandorg/app-auth';
import {
  jobsActionTypes,
  tasksActionTypes,
  assignmentActionTypes,
  onboardingActionTypes,
  responsesActionTypes,
} from '../../sagas/actionTypes';

const initialState = [];

export default function assignedResponsesReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.GET_CURRENT_COMPLETE:
    case authActionTypes.LOGIN_COMPLETE:
    case authActionTypes.LOGIN_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_COMPLETE:
      return action.payload.result.assignedResponses || initialState;

    case jobsActionTypes.ASSIGN_TASK_COMPLETE:
      return action.payload.result.assignedResponses;

    case onboardingActionTypes.REPORT_COMPLETE:
      return action.payload.result.assignedResponses;

    case tasksActionTypes.SUBMIT_COMPLETE:
    case responsesActionTypes.VERIFY_COMPLETE:
      return action.payload.result.assignedResponses;

    case assignmentActionTypes.REPORT_COMPLETE:
    case assignmentActionTypes.CANCEL_COMPLETE:
      return action.payload.result.assignedResponses;

    case authActionTypes.GET_CURRENT_FAILED:
    case authActionTypes.LOGIN_FAILED:
      return initialState;
    default:
      break;
  }
  return state;
}
