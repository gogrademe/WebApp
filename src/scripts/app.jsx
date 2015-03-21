/* @flow */

import React from 'react';
import DocumentTitle from 'react-document-title';
import {RouteHandler} from 'react-router';

import HeaderNav from './components/Header';

// Hosts
import ModalHost from './host/ModalHost.jsx';

import api from './api/api.ls';
import auth from './api/auth.ls';

if (process.env.NODE_ENV !== "production") {
  api.baseUrl = 'http://localhost:5005';
}

if (process.env.NODE_ENV === "production") {
  api.baseUrl = 'http://api.gogrademe.com';
}

export default React.createClass({
  loggedIn() {
    if (api.session.get()) {
      return <HeaderNav />;
    }
  },
  render() {
    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          {this.loggedIn()}
          <div className="page">
            <div className="full height">
              <RouteHandler/>
            </div>
            <ModalHost />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});
