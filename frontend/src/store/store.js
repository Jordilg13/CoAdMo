import { applyMiddleware, createStore } from 'redux';
import { dataTableMiddleware, localStorageMiddleware, promiseMiddleware } from '../middlewares/middleware';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory as createHistory } from 'history'
import reducer from '../reducers';
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory();
const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            dataTableMiddleware,
            myRouterMiddleware,
            promiseMiddleware,
            localStorageMiddleware,
        )
    ),
);