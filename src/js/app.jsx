import React from 'react';
import DocumentTitle from 'react-document-title';
import {RouteHandler} from 'react-router';

import HeaderNav from './components/Header';

// Hosts
import ModalHost from './host/ModalHost';

import api from './api/api';
import auth from './api/auth';

if (process.env.NODE_ENV === "production") {
  api.baseUrl = 'http://api.gogrademe.com';
} else {
  api.baseUrl = 'http://localhost:5005';
}

export default React.createClass({
  loggedIn() {
    if (api.session.get()) {
      return <HeaderNav />;
    }
  },
  render() {
    const className = api.session.get() ? "main container" : "";
    
    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          {this.loggedIn()}
          <div className={className}>
            <RouteHandler/>
          </div>
          <ModalHost />
        </div>
      </DocumentTitle>
    );
  }
});
