
var React = require('react');
var Router = require('react-router');
var api = require('../api/auth');

export default React.createClass({
  componentDidMount: function() {
    if (auth.isLoggedIn()) {
      Router.transitionTo('dashboard');
    } else {
      Router.transitionTo('login');
    }
  },
  render: function() {
    return <div>
  }
});
