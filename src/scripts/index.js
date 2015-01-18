/* @flow */

var React = require('react');
var AppRoutes = require('./routes');
var Router = require('react-router');

var FormsyValidators = require('./utils/validators')();

window.React = React;



Router.run(AppRoutes, function (Handler) {
  React.render(<Handler/>, document.getElementById("app"));
});
