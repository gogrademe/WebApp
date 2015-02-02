/* @flow */

"use strict";

var React = require('react');
var Reflux = require('reflux');

var DocumentTitle = require('react-document-title');

var HeaderNav = require('./components/Header');

// Hosts
var ModalHost = require('./host/ModalHost.jsx');


var sessionStore = require('./stores/SessionStore');


var api = require('./api/api.ls');
var auth = require('./api/auth.ls');

var {Router, State, RouteHandler} = require('react-router');

if (process.env.NODE_ENV !== "production") {
  api.baseUrl = 'http://localhost:5005';
}
if (process.env.NODE_ENV === "production") {
  api.baseUrl = 'http://api.gogrademe.com';
}

var App = React.createClass({
  mixins: [State, Reflux.connect(sessionStore,"currentSession")],
  // statics: {
  //   willTransitionTo: function(transition, params){
  //     console.log('transitioning');
  //     console.log(auth.isLoggedIn());
  //     // if (!!api.auth.token) {
  //     //   return transition.redirect('/login');
  //     // }
  //   }
  // },
  loggedIn: function(){
    if (api.session.get()) {
      return <HeaderNav />;
    }
  },
  render: function(){
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
module.exports = App;
