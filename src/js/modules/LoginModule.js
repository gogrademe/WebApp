import React, {Component, PropTypes} from 'react';
import {Navigation} from 'react-router';
import {connect} from 'react-redux';
import auth from '../api/auth';

import { login } from '../redux/modules/auth';

require('./LoginModule.less');

const logo = require('../../assets/logo.svg');

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    // this.setState({
    //   isLoggingIn: true
    // });

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    const { dispatch } = this.props;
    dispatch(login(email,password));
    // auth.login({
    //   email: email,
    //   password: password
    // }).then(() => {
    // }).error((it) => {
    //   this.setState({
    //     isLoggingIn: false,
    //     error: it
    //   });
    // });
  }
  renderMessages(){
    if (this.props.error) {
      return (
        <div>
          {this.props.error.data}
        </div>
      );
    }
  }
  render(){
    return (
      <div>
        <img className='profile-img-card' src={logo} />
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
                disabled={this.props.loggingIn}
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
};

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
LoginPage.contextTypes = {
  store: PropTypes.object.isRequired
}

export default connect(state => ({loggingIn: state.auth.loggingIn, error:state.auth.loginError}))(LoginPage)
