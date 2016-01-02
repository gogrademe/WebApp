import {
  createStore, applyMiddleware, compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from './middleware/api';
import clientMiddleware from './middleware/clientMiddleware';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

import DevTools from '../containers/DevTools';

const logger = createLogger({
  collapsed: true
});


export default function configureStore(client, initialState) {
  const middleware = [thunkMiddleware, apiMiddleware, clientMiddleware(client), logger];
  const store = compose(
    applyMiddleware(...middleware),
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
