/** @jsx React.DOM */

var React = require('react');
var RRouter = require('rrouter');
var Routes = RRouter.Routes;
var Route = RRouter.Route;

var Users = React.createClass({
  render: function() {
    return <div>Users</div>
  }
});

var User = React.createClass({
  render: function() {
    return <div>User Page for {this.props.username}</div>
  }
});
var UserEdit = React.createClass({
  render: function() {
    return <div>User Edit</div>
  }
});

module.exports = (
  <Routes name="users" view={Users}>
    <Route name="user" path=":username" view={User} >
      <Route name="edit" view={UserEdit} />
    </Route>
  </Routes>
);
