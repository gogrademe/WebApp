import React from 'react';
import {Navigation} from 'react-router';
import auth from '../api/auth';

require('./LoginModule.less');
require('../../assets/logo.svg');

const LoginPage = React.createClass({
  mixins: [Navigation],
  getInitialState(){
    return {
      error: null,
      isLoggingIn: false
    };
  },
  handleSubmit(e){
    e.preventDefault();
    this.setState({
      isLoggingIn: true
    });
    const email = this.refs.email.getDOMNode().value.trim();
    const password = this.refs.password.getDOMNode().value.trim();

    auth.login({
      email: email,
      password: password
    }).then(() => {
      this.transitionTo('dashboard');
    }).error((it) => {
      this.setState({
        isLoggingIn: false,
        error: it
      });
    });
  },
  renderMessages(){
    if (this.state.error !== null) {
      return (
        <div>
          {this.state.error.statusCode + ': ' + this.state.error.message}
        </div>
      );
    }
  },
  render(){
    return (
      <div>
        <img className='profile-img-card' src='logo.svg' />
        <div className='login container'>
          <div className='card card-container'>
            <form className='form-signin' onSubmit={this.handleSubmit}>
              {this.renderMessages()}
              <input
                type='email'
                ref='email'
                className='form-control'
                placeholder='Email address'
                required
                autoFocus />
              <input
                type='password'
                ref='password'
                className='form-control'
                placeholder='Password'
                required />
              <button
                className='btn btn-lg btn-success btn-block btn-signin'
                disabled={this.state.isLoggingIn}
                type='submit'
                value='Post'>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

// const LoginLoading = React.createClass({
//   render(){
//     var style;
//     style = {};
//     if (!this.props.isLoggingIn === true) {
//       style.display = 'none';
//     }
//     return i({
//       className: 'fa fa-cog fa-spin',
//       style: style
//     });
//   }
// });

module.exports = LoginPage;
