import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import App from './containers/App';
import Private from './containers/Private';
import Home from './components/Home';
import Login from './containers/Login';
import Jobs from './containers/Jobs';
import Account from './containers/Account';
import Task from './containers/Task';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} />
          <Route component={Private}>
            <Route path="task" component={Task} />
            <Route path="jobs" component={Jobs} />
            <Route path="account" component={Account} />
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root'),
);
