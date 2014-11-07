
var React = require('react');
var HeaderNav = require('./components/Header');
var api = require('./api/api.ls');
var auth = require('./api/auth.ls');

if (process.env.NODE_ENV !== "production") {
  api.baseUrl = 'http://localhost:5005';
}
if (process.env.NODE_ENV === "production") {
  api.baseUrl = 'http://api.gogrademe.com';
}

var App = React.createClass({
  loggedIn: function(){
    if (api.session.get()) {
      return HeaderNav({});
    }
  },
  render: function(){
    return (
      <div>
        {this.loggedIn()}
        <div className="page">
          <div className="full height">
            {this.props.activeRouteHandler() || "Loading..."}
          </div>
        </div>
      </div>
    )
  }
});
module.exports = App;
