import {
  authActionTypes,
  jobsActionTypes,
  tasksActionTypes,
  onboardingActionTypes,
} from '../../sagas/actionTypes';

const initialState = [];

export default function assignedTasksReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.GET_CURRENT_COMPLETE:
    case authActionTypes.LOGIN_COMPLETE:
    case authActionTypes.LOGIN_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_METAMASK_COMPLETE:
    case authActionTypes.SIGNUP_COMPLETE:
      return action.payload.result.assignedTasks || initialState;

    case jobsActionTypes.ASSIGN_COMPLETE:
      return action.payload.result.assignedTasks;

    case onboardingActionTypes.REPORT_COMPLETE:
      return action.payload.result.assignedTasks;

    case tasksActionTypes.SUBMIT_COMPLETE:
      return action.payload.result.assignedTasks;

    case tasksActionTypes.REPORT_COMPLETE:
      return action.payload.result.assignedTasks;

    case authActionTypes.GET_CURRENT_FAILED:
    case authActionTypes.LOGIN_FAILED:
      return initialState;
    default:
      break;
  }
  return state;
}
