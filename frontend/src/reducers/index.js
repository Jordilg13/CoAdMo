import { combineReducers } from 'redux';

// reducers
import auth from './auth';
import common from './common';

export default combineReducers({
  auth,
  common,
  // router: routerReducer
});