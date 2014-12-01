/* @flow */

var React = require('react');
var AppRoutes = require('./routes.jsx');
var Router = require('react-router');

window.React = React;

// React.render(AppRoutes, document.getElementById("app"));


Router.run(AppRoutes, function (Handler) {
  React.render(<Handler/>, document.getElementById("app"));
});
