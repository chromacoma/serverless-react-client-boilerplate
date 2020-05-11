import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

import history from './history';
import rootReducer from '../_reducers/root';

// const loggerMiddleware = createLogger();
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancer = compose;

const store = createStore(
  rootReducer(history), // root reducer with router state
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
      // loggerMiddleware
    )
  )
);
export default store;
