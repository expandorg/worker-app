import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './lib/create-store';
import Routing from './components/routing';
// import App from './containers/App';
// import Private from './containers/Private';
// import Login from './containers/Login';
// import Jobs from './containers/Jobs';
// import Account from './containers/Account';
// import Task from './containers/Task';
// import NotFound from './containers/NotFound';

const renderApp = (container = document.getElementById('root')) => {
  const store = createStore();
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render((
    <Provider store={store}>
      <Routing history={history} />
    </Provider>
  ), container);
};

renderApp();
