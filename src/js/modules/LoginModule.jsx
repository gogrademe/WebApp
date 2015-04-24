import React from 'react';
import {Router, Navigation} from 'react-router';

import Panel from '../components/Panel';
import auth from '../api/auth';


const LoginPage = React.createClass({
    mixins: [Navigation],
    getInitialState(){
      return {
        error: null,
        isLoggingIn: false
      };
    },
    handleSubmit(e){
      var email, password, this$ = this;
      e.preventDefault();
      this.setState({
        isLoggingIn: true
      });
      email = this.refs.email.getDOMNode().value.trim();
      password = this.refs.password.getDOMNode().value.trim();
      auth.login({
        email: email,
        password: password
      }).then(function(){
        return this$.transitionTo('dashboard');
      }).error(function(it){
        return this$.setState({
          isLoggingIn: false,
          error: it
        });
      });
    },
    renderMessages(){
      if (this.state.error !== null) {
        return div({
          className: "ui error visible message"
        }, this.state.error.statusCode + ": " + this.state.error.message);
      }
    },
    render(){
      return (
        <div className="login container">
          <div>
            <form className="ui fluid form segment" onSubmit={this.handleSubmit}>
              <h4 className="ui header">Login</h4>
              {this.renderMessages()}
              <div className="field">
                  <div className="ui right labeled left icon input">
                      <input
                          type="email"
                          placeholder="Email Address"
                          ref="email"
                          required={true} />
                      <i className="user icon"></i>
                  </div>
              </div>
            </form>
          </div>
        </div>
      )
      // return div({
      //   className: "login container"
      // }, img({
      //   className: "logo",
      //   src: "logo.svg"
      // }), div(null, form({
      //   className: "ui fluid form segment",
      //   onSubmit: this.handleSubmit
      // }, h4({
      //   className: "ui header"
      // }, "Login"), this.renderMessages(), div({
      //   className: "field"
      // }, div({
      //   className: "ui right labeled left icon input"
      // }, input({
      //   type: "email",
      //   placeholder: "Email Address",
      //   ref: "email",
      //   required: true
      // }), i({
      //   className: "user icon"
      // }), div({
      //   className: "ui corner label"
      // }, i({
      //   className: "icon asterisk"
      // })))), div({
      //   className: "field"
      // }, div({
      //   className: "ui right labeled left icon input"
      // }, input({
      //   type: "password",
      //   placeholder: "Password",
      //   ref: "password",
      //   required: true
      // }), i({
      //   className: "lock icon"
      // }), div({
      //   className: "ui corner label"
      // }, i({
      //   className: "icon asterisk"
      // })))), div({
      //   className: "field"
      // }, button({
      //   type: "submit",
      //   disabled: this.state.isLoggingIn,
      //   role: "button",
      //   className: "ui primary fluid submit button",
      //   value: "Post"
      // }, LoginLoading({
      //   isLoggingIn: this.state.isLoggingIn
      // }), "Log in")))));
    }
  });

const LoginLoading = React.createClass({
    render(){
      var style;
      style = {};
      if (!this.props.isLoggingIn === true) {
        style.display = "none";
      }
      return i({
        className: "fa fa-cog fa-spin",
        style: style
      });
    }
  });

module.exports = LoginPage;
