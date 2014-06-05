/** @jsx React.DOM */

'use strict';
var React = require('react');
var Panel = require('../components/Panel.jsx');

var LoginPage = React.createClass({
  getInitialState : function() {
    return {
      AuthStore: window.flux.store("AuthStore").getState()
    };
  },
  handleSubmit: function(e) {
    this.setState({isLoggingIn: true});
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    // AuthActions.login(email, password);
    flux.actions.loginAuth(email, password);
  },
  render: function() {
    console.log(this.state);
    return (
      <Panel className="form-login" title="Login" hasBody>
        <form className = "form-horizontal" onSubmit={this.handleSubmit}>
          <div className="input-group field">
            <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
            <input type="text" className="form-control" placeholder="Email Address" ref="email" required/>
          </div>
          <div className="input-group field">
            <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i ></span>
            <input type="password" className="form-control" placeholder="Password" ref="password" required/>
          </div>
          <div className="field">
            <button type="submit"
                    disabled={this.state.isLoggingIn}
                    role="button"
                    className="btn btn-primary btn-block"
                    value="Post">
            <LoginLoading isLoggingIn={this.state.isLoggingIn} /> Log in </button>
          </div>
        </form>
      </Panel>
      );
    }
});


var LoginLoading = React.createClass({
  render: function() {
    var style = {};
    if(!this.props.isLoggingIn === true) {
      style.display = 'none';
    }
    return (
        <i className="fa fa-cog fa-spin" style={style}></i>
      );
  }
});


module.exports = LoginPage;
