import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';

import HeaderNav from './components/Header';

// Hosts
import ModalHost from './host/ModalHost';

import api from './api/api';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from './redux/modules/auth';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  },
  contextTypes: {
    store: PropTypes.object.isRequired
  },
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadAuth());
  },
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/dashboard');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  },
  loggedIn() {
    if (api.session.get()) {return <HeaderNav/>;}
  },

  render() {
    const className = api.session.get()
      ? 'main container'
      : '';

    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          {this.loggedIn()}
          <div className={className}>
            {this.props.children}
          </div>
          {/*<ModalHost /> */}
        </div>
      </DocumentTitle>
    );
  }
});

export default connect(state => ({user: state.auth.user},{logout}))(App)
