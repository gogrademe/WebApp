
require('file?name=favicon.ico!../assets/favicon.ico');

require('../less/main.less');

import 'babel-polyfill';
import React,{Component} from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory'
import axios from 'axios';
import App from './app'
import api from './api/api';
import DevTools from './containers/DevTools';

import configureStore from './store/configureStore';

import getRoutes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';

import FormsyValidators from './utils/validators';
FormsyValidators();

window.React = React;

if (process.env.NODE_ENV === 'production') {
  api.baseUrl = 'http://api.gogrademe.com';
} else {
  api.baseUrl = 'http://localhost:5000';
}

const client = axios.create({
  baseURL: api.baseUrl,
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${localStorage.token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const store = configureStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), createHistory, client, window.__data);

render(
  <Provider store={store} key="provider">
    <div>
      <ReduxRouter routes={getRoutes(store)} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
