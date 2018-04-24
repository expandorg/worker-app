import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './rootReducer';

const routingMiddleware = routerMiddleware(browserHistory);

const middleware = ((middlewares) => {
  if (process.env.NODE_ENV !== 'production') {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      return compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }
  return applyMiddleware(...middlewares);
})([thunkMiddleware, routingMiddleware]);


const store = createStore(rootReducer, window.initialState || {}, middleware);

export default store;
