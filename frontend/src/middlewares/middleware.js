// import {
//     ASYNC_START,
//     ASYNC_END
//   } from '../constants/actionTypes';

import agent from "../agent/agent"
import { push } from 'react-router-redux';
import toastr from 'toastr'

// Promise middleware, sets the state in progress while the promise is not solved
const promiseMiddleware = store => next => action => {


  if (isPromise(action.payload)) {
    // console.log("MIDDLEWARE", action);
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
        try {
          action.payload = error.response.body;
        } catch (error) {
          action.payload = error

        }
        toastr.error(error)

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

const dataTableMiddleware = store => next => action => {
  if (action.type === "GET_USERS" || action.type === "GET_HOSTS") {

    if (isPromise(action.payload)) {
      action.payload.then(
        res => {
          // console.log('MIDDLEWARE_RESULT', res);
          action.payload = res;          
          store.dispatch(action);
        },
        error => {
          action.error = true;
          store.dispatch(action);
        }
      );


      return
    }
  }

  next(action);
}


function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware, dataTableMiddleware }