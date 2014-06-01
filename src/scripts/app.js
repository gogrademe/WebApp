/** @jsx React.DOM */

var React = require('react');
var RRouter = require('rrouter');
var Routes = RRouter.Routes;
var Route = RRouter.Route;

var MainPage = React.createClass({
  render: function() {
    return <div>Main page</div>
  }
});

var AboutPage = React.createClass({
  render: function() {
    return <div>About</div>
  }
});

var r = require('./pages/users/index.js');

var routes = (
  <Routes>
    <Route path="/user">
      {r}
    </Route>
    <Route path="/" view={MainPage} />
    <Route path="/about" view={AboutPage} />
  </Routes>
);


RRouter.start(routes, function(view) {
  React.renderComponent(view, document.body);
});
