require('babel/polyfill');
require('../less/main.less');

import React from 'react';
import Router from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import AppRoutes from './routes';

import FormsyValidators from './utils/validators';
FormsyValidators();


window.React = React;
const store = configureStore();
Router.run(AppRoutes, (Handler) => {
  React.render(
    <Provider store={store}>
      {() =>
        <Handler/>
      }
    </Provider>, document.getElementById('app'));
});
