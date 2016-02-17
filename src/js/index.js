
require('file?name=favicon.ico!../assets/favicon.ico');

require('../less/main.less');

import 'babel-polyfill';
import React,{Component} from 'react';

import { Router, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import axios from 'axios';

import api from './api/api';

import DevTools from './containers/DevTools';

import configureStore from './redux/configureStore';

import getRoutes from './routes';

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
    'Authorization': `Bearer ${localStorage.id_token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


const store = configureStore(client, browserHistory);

const mountNode = document.getElementById('app')
render(
  <Provider store={store} key="provider">
    <div>
      <Router history={browserHistory} routes={getRoutes(store)}/>
      <DevTools />
    </div>
  </Provider>,
  mountNode
);
