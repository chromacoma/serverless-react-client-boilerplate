import React from 'react';
import ReactDom from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Auth, Storage, API } from 'aws-amplify';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

import amplifyConfig from './aws-amplify.config';
import history from './_helpers/history';
import store from './_helpers/store';
import config from './config';

import App from './App';
import './index.scss';

// for whatever reason, Amplify.configure(amplifyConfig) isn't working on the internet
Auth.configure(amplifyConfig.Auth);
API.configure(amplifyConfig.API);
Storage.configure(amplifyConfig.Storage);

ReactGA.initialize(config.google.analyticsCode);
// ReactGA.set({
// userId: auth.currentUserId(),
// any data that is relevant to the user session
// that you would like to track with google analytics
// })
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

// removed <React.strictMode> wrapper for provider due to warnings from react-bootstrap
ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
