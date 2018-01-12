import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createReducer from './create-reducer';
import middleware from './middleware';
import rootSaga from '../sagas';

export default () => {
  const saga = createSagaMiddleware();

  const middlewares = [
    routerMiddleware(browserHistory),
    saga,
    thunk,
    middleware,
  ];

  let composeEnhancers = compose;

  if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(createReducer(), composeEnhancers(applyMiddleware(...middlewares)));

  store.runSaga = saga.run;

  saga.run(rootSaga);

  return store;
};
