
/* @flow */

var React = require('react');
var Router = require('react-router');

var AppRoutes = require('./routes');

var FormsyValidators = require('./utils/validators')();

window.React = React;

Router.run(AppRoutes, function (Handler) {
  React.render(<Handler/>, document.getElementById("app"));
});
