
// require('file?name=favicon.ico!../assets/favicon.ico');

import '../less/main.less';

import 'babel-polyfill';
import * as React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {client} from './redux/api';

import api = require('./api/api');

import DevTools from './containers/DevTools';

import configureStore from './redux/configureStore';
import { Provider as MobxProvider } from 'mobx-react';
import * as stores from './stores';

import App from './containers/App';
import ModalContainer from './host/ModalHost';




// if (process.env.NODE_ENV === 'production') {
//   api.baseUrl = 'http://api.gogrademe.com';
// } else {
  api.baseUrl = 'http://localhost:5000';
// }

const store = configureStore(client);
const mountNode = document.getElementById('app');
const personStore = new stores.PersonStore(api.default);

render(
  <Provider store={store} key="provider">
    <MobxProvider modalStore={stores.modalStore} personStore={personStore}>
      <div>
        <App/>
        <DevTools />
        <ModalContainer />
      </div>
    </MobxProvider>
  </Provider>,
  mountNode
);
