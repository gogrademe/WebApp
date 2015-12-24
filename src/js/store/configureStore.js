import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../redux/middleware/api';
import clientMiddleware from '../redux/middleware/clientMiddleware';
import createLogger from 'redux-logger';
import rootReducer from '../redux/reducers';

import DevTools from '../containers/DevTools';

const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(
//   thunkMiddleware,
//   apiMiddleware,
//   logger
// )(createStore);


export default function configureStore(reduxReactRouter, getRoutes, createHistory,client, data) {
  const middleware = [thunkMiddleware, apiMiddleware, clientMiddleware(client), logger];
  const store = compose(
    applyMiddleware(...middleware),
    reduxReactRouter({getRoutes, createHistory}),
    DevTools.instrument()
  )(createStore)(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux/reducers', () => {
      const nextRootReducer = require('../redux/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
