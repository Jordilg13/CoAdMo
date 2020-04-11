// import {
//     ASYNC_START,
//     ASYNC_END
//   } from '../constants/actionTypes';
import { push } from 'react-router-redux';
import agent from "../agent/agent"



// Promise middleware, sets the state in progress while the promise is not solved
const promiseMiddleware = store => next => action => {
  // console.log("MIDDLEWARE", action);


  if (isPromise(action.payload)) {
    // store.dispatch({ type: ASYNC_START, subtype: action.type });

    action.payload.then(
      res => {
        // console.log('MIDDLEWARE_RESULT', res);

        action.payload = res;
        // store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
        // redirect to the main dashboard
        if (action.type === "LOGIN") {
          store.dispatch(push("/dashboard"))
        }

      },
      error => {
        action.error = true;
        action.payload =  error.response.body;
        
        // if the token is not valid
        if (error.response.statusCode === 403) {
          action.type = "LOGOUT"
          store.dispatch(action)
          store.dispatch(push("/login"))
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {

  if (action.type === "LOGIN") {
    if (!action.error) {
      window.localStorage.setItem('token', action.payload.token);
      agent.setToken(action.payload.token);
    }
  } else if (action.type === "LOGOUT") {
    window.localStorage.removeItem('token');
    agent.setToken(null);
  }

  next(action);
};


function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }