
require('../less/main.less');

import 'babel-polyfill';
import React from 'react';
import Router from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import AppRoutes from './routes';

import FormsyValidators from './utils/validators';
FormsyValidators();

window.React = React;
const store = configureStore();
const DevTools = require('./containers/DevTools');
Router.run(AppRoutes, (Handler) => {
  React.render(
    <Provider store={store} key="provider">
      {() =>
        <div>
          <Handler/>
          <DevTools/>
        </div>
      }
    </Provider>,
    document.getElementById('app'));
  });
