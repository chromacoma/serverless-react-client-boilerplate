import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import alert from './alert';
import authentication from './authentication';
import user from './user';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    alert,
    authentication,
    user,
  });

export default rootReducer;
