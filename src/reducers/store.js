import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from '../sagas';

import rootReducer from './rootReducer';

export const sagaMiddleware = createSagaMiddleware();

const middleware = ((middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      return compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }
  return applyMiddleware(...middlewares);
})([sagaMiddleware]);


const store = createStore(rootReducer, window.initialState || {}, middleware);

sagaMiddleware.run(sagas);

export default store;
