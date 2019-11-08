// require('file?name=favicon.ico!../assets/favicon.ico');

import "../less/main.less";

import "babel-polyfill";
import * as React from "react";

import { render } from "react-dom";
import { Provider } from "react-redux";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { client } from "./redux/api";

import api = require("./api/api");

import DevTools from "./containers/DevTools";

import configureStore from "./redux/configureStore";
import { Provider as MobxProvider } from "mobx-react";
import * as stores from "./stores";

import App from "./containers/App";
import ModalContainer from "./host/ModalHost";

// if (process.env.NODE_ENV === 'production') {
//   api.baseUrl = 'http://api.gogrademe.com';
// } else {
api.baseUrl = "http://localhost:5000";
// }

const store = configureStore(client);
const mountNode = document.getElementById("app");
const personStore = new stores.PersonStore(api.default);

const apolloClient = new ApolloClient({
  uri: `${api.baseUrl}/query`
});

render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store} key="provider">
      <MobxProvider modalStore={stores.modalStore} personStore={personStore}>
        <div>
          <App />
          <DevTools />
          <ModalContainer />
        </div>
      </MobxProvider>
    </Provider>
  </ApolloProvider>,
  mountNode
);
