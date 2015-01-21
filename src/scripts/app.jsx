/* @flow */

var React = require('react');

var DocumentTitle = require('react-document-title');

var HeaderNav = require('./components/Header');

var ModalHost = require('./host/ModalHost.jsx');


var api = require('./api/api.ls');
var auth = require('./api/auth.ls');

var {RouteHandler} = require('react-router');

if (process.env.NODE_ENV !== "production") {
  api.baseUrl = 'http://localhost:5005';
}
if (process.env.NODE_ENV === "production") {
  api.baseUrl = 'http://api.gogrademe.com';
}


var App = React.createClass({
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

// {this.loggedIn()}
// {this.props.activeRouteHandler() || "Loading..."}
