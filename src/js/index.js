
require('file?name=favicon.ico!../assets/favicon.ico');

import '../less/main.less';

import 'babel-polyfill';
import React,{Component} from 'react';

import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import {client} from './redux/api';

import api from './api/api';

import DevTools from './containers/DevTools';

import configureStore from './redux/configureStore';

import getRoutes from './routes';

window.React = React;

if (process.env.NODE_ENV === 'production') {
  api.baseUrl = 'http://api.gogrademe.com';
} else {
  api.baseUrl = 'http://localhost:5000';
}
// Disable logging for semantic-ui-react
localStorage.debug = null;


const store = configureStore(client);

const mountNode = document.getElementById('app');
render(
  <Provider store={store} key="provider">
    <div>
      <Router history={browserHistory} routes={getRoutes(store)}/>
      <DevTools />
    </div>
  </Provider>,
  mountNode
);
