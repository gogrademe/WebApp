/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');
var Panel = require('../panel');
var AuthActions = require('../../actions/AuthActions')
var LoginForm = React.createClass({
  handleSubmit: function() {
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    AuthActions.login(username, password);

    console.log(username, password);

    return false;
  },
  render: function() {
  return (
    <Panel className="form-login">
      <form className="form-horizontal" onSubmit={this.handleSubmit} >
        <div className="input-group field">
          <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
          <input type="text" className="form-control" placeholder="Username" required ref="username"/>
        </div>
        <div className="input-group field">
          <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i></span>
          <input type="password" className="form-control" placeholder="Password" required  ref="password"/>
        </div>
        <div className="field">
          <button type="submit" role="button" className="btn btn-primary btn-block" value="Post">
            <i className="fa fa-cog fa-spin"></i> Log in
          </button>
        </div>
      </form>
      </Panel>
  )
}
});

module.exports = LoginForm;