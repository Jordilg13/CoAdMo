import auth from './auth';
import { combineReducers } from 'redux';
import common from './common';
import hosts from './hosts';
import users from './users';

// reducers





export default combineReducers({
  auth,
  common,
  users,
  hosts,
  // router: routerReducer
});