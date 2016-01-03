import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import { pushPath } from 'redux-simple-router'
import {connect} from 'react-redux';

import AppNav from '../components/AppNav';

// Hosts
import ModalHost from '../host/ModalHost';

import api from '../api/api';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../redux/modules/auth';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadAuth());
  }
  componentWillReceiveProps(nextProps) {
    const {currentUser} = this.props;

    if (!currentUser && nextProps.user) {
      // login
      dispatch(pushPath('/app'));
    } else if (currentUser && !nextProps.user) {
      // logout
      dispatch(pushPath('/'));
    }
  }

  loggedIn() {
    if (api.session.get()) {return <AppNav personName="Matt"/>;}
  }
  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const className = api.session.get()
      ? 'main container'
      : '';

    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          {this.loggedIn()}
          {this.renderErrorMessage()}
          <div className={className}>
            {this.props.children}
          </div>
          <ModalHost />
        </div>
      </DocumentTitle>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  // resetErrorMessage: PropTypes.func.isRequired,
  // inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

App.contextTypes = {
  store: PropTypes.object.isRequired
}

export default connect(state => ({user: state.auth.user},{logout}))(App)
