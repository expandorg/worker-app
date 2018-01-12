import combineNestedReducers from 'combine-nested-reducers';
import { routerReducer } from 'react-router-redux';
import { version } from '../../package.json';
import web3Reducer from '../reducers/web3';
import statsReducer from '../reducers/stats';
import authReducer from '../reducers/auth';
import jobReducer from '../reducers/job';
import taskReducer from '../reducers/task';
import uiReducer from '../reducers/ui';

export default () => combineNestedReducers({
  version: () => version,

  ui: uiReducer,
  web3: web3Reducer,

  stats: statsReducer,
  job: jobReducer,
  task: taskReducer,
  auth: authReducer,

  routing: routerReducer,
});
