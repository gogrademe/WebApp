
// require('file?name=favicon.ico!../assets/favicon.ico');

import '../less/main.less';

import 'babel-polyfill';
import * as React from 'react';

import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {client} from './redux/api';

// import * as api from './api/api';

import api = require('./api/api');

import DevTools from './containers/DevTools';
import MobxDevTools from 'mobx-react-devtools';

import configureStore from './redux/configureStore';

import getRoutes from './routes';
import { useStrict } from 'mobx';
import { Provider as MobxProvider } from 'mobx-react';
import * as stores from './stores';

import ModalContainer from './host/ModalHost';
// window.React = React;


// if (process.env.NODE_ENV === 'production') {
//   api.baseUrl = 'http://api.gogrademe.com';
// } else {
  api.baseUrl = 'http://localhost:5000';
// }

// Disable logging for semantic-ui-react
// localStorage.debug = null;
useStrict(true);
const store = configureStore(client);
const mountNode = document.getElementById('app');
const personStore = new stores.PersonStore(api);
// console.log(personStore);
render(
  <Provider store={store} key="provider">
    <MobxProvider modalStore={stores.modalStore} personStore={personStore}>
      <div>
        <Router history={browserHistory} routes={getRoutes(store)}/>
        <DevTools />
        <MobxDevTools />
        <ModalContainer />
      </div>
    </MobxProvider>
  </Provider>,
  mountNode
);
