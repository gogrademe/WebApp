
import React from 'react';
import Router from 'react-router';
import api from '../api/auth';

export default React.createClass({
  componentDidMount() {
    if (auth.isLoggedIn()) {
      Router.transitionTo('dashboard');
    } else {
      Router.transitionTo('login');
    }
  },
  render() {
    return <div>
  }
});
