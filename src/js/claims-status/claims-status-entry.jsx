import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { IndexRedirect, Route, Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';

import ClaimsStatusApp from './containers/ClaimsStatusApp.jsx';
import initReact from '../common/init-react';
import createCommonStore from '../common/store';
import routes from './routes.jsx';
import { setLastPage } from './actions/index.jsx';
import { basename } from './utils/page';
import reducer from './reducers';
import createLoginWidget from '../login/login-entry';

require('../common');  // Bring in the common javascript.
require('../../sass/claims-status.scss');

const store = createCommonStore(reducer);
createLoginWidget(store);

const history = useRouterHistory(createHistory)({
  basename
});

history.listen((location) => {
  store.dispatch(setLastPage(location.pathname));
});

function init() {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={ClaimsStatusApp}>
          <IndexRedirect to="/your-claims"/>
          {routes}
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('react-root'));
}

// Start react.
initReact(init);