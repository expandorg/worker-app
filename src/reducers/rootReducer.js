import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import actions from '../actions/action-types';

const defaultStats = {
  pending: 0,
  accepted: 0,
  rejected: 0,
};

function simpleReducer(defaultValue, actionType) {
  return (state = defaultValue, action) => (action.type === actionType ? action.payload : state);
}

export default combineReducers({
  error: simpleReducer(null, actions.SET_ERROR),
  isAuthorized: simpleReducer(null, actions.SET_IS_AUTHORIZED),
  isJoined: simpleReducer(false, actions.SET_IS_JOINED),
  isSubmitting: simpleReducer(false, actions.SET_IS_SUBMITTING),
  depositStage: simpleReducer(0, actions.SET_DEPOSIT_STAGE),
  pageTitle: simpleReducer('', actions.SET_PAGE_TITLE),
  previousJobId: simpleReducer(null, actions.SET_PREVIOUS_JOB_ID),
  routing: routerReducer,
  worker: simpleReducer(null, actions.SET_WORKER),
  gemsBalance: simpleReducer(null, actions.SET_GEMS_BALANCE),
  stats: (state = defaultStats, action) => {
    if (action.type === actions.SET_STATS) {
      return action.payload || defaultStats;
    }
    return state;
  },
  metamask: simpleReducer(null, actions.SET_METAMASK),
  locked: simpleReducer(null, actions.SET_METAMASK_LOCKED),
  transactions: simpleReducer(null, actions.SET_TRANSACTIONS),
});
