import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import actions from './action-types';

function simpleReducer(defaultValue, actionType) {
  return (state = defaultValue, action) => (action.type === actionType ? action.payload : state);
}

const reducer = combineReducers({
  assignedJobId: simpleReducer(null, actions.SET_ASSIGNED_JOB_ID),
  error: simpleReducer(null, actions.SET_ERROR),
  isAuthorized: simpleReducer(null, actions.SET_IS_AUTHORIZED),
  jobs: (state = {}, action) => {
    switch (action.type) {
      case actions.SET_JOBS:
        return action.payload;
      case actions.SET_JOB: {
        const { jobId, job } = action.payload;
        if (job === null) {
          delete state[jobId];
        } else {
          state[jobId] = job;
        }
        return state;
      }
      default:
        return state;
    }
  },
  pageTitle: simpleReducer('', actions.SET_PAGE_TITLE),
  previousJobId: simpleReducer(null, actions.SET_PREVIOUS_JOB_ID),
  routing: routerReducer,
  task: simpleReducer(null, actions.SET_TASK),
  web3: simpleReducer(null, actions.SET_WEB3),
  worker: simpleReducer(null, actions.SET_WORKER),
});

export default reducer;
