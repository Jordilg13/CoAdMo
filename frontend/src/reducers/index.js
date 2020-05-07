import { combineReducers } from 'redux';

// reducers
import auth from './auth';
import common from './common';
import users from './users';

export default combineReducers({
  auth,
  common,
  users,
  // router: routerReducer
});