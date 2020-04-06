// import {
//     ASYNC_START,
//     ASYNC_END
//   } from '../constants/actionTypes';
import { push } from 'react-router-redux';
import agent from "../agent/agent"



// Promise middleware, sets the state in progress while the promise is not solved
const promiseMiddleware = store => next => action => {
  console.log("MIDDLEWARE", action);


  if (isPromise(action.payload)) {
    console.log(action);

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
        // console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body.error[0];
        // if (!action.skipTracking) {
        //   store.dispatch({ type: ASYNC_END, promise: action.payload });
        // }
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
      window.localStorage.setItem('jwt', action.payload.token);
      agent.setToken(action.payload.token);
    }
  } else if (action.type === "LOGOUT") {
    window.localStorage.setItem('token', '');
    agent.setToken(null);
  }

  next(action);
};


function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }