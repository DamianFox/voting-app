import { applyMiddleware, createStore } from 'redux';
//import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { loadState } from './../loadStorage';

import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const persistedState = loadState();

// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);

// export const store = createStore(
//   reducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = createStore(reducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));