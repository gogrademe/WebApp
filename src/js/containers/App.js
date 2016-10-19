import React, {Component, PropTypes} from 'react';
import { Container, Segment } from 'semantic-ui-react'
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';

import AppNav from '../components/AppNav';

import { load as loadAuth, lock, logout } from '../redux/modules/auth0';

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
    const {loadAuth} = this.props;
    loadAuth();
  }
  componentWillReceiveProps(nextProps) {
    const {profile,isAuthenticated, authLoading} = this.props;
    const {push} = this.context.router;
    if (!isAuthenticated && nextProps.isAuthenticated) {
      // login
      push('/app');
    } else if (!nextProps.isAuthenticated && !nextProps.authLoading) {
      // this.props.lock()
    }
  }
  renderErrorMessage() {
    const { errorMessage } = this.props;
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
    const {children, isAuthenticated, authLoading,lock, logout, profile} = this.props;
    var name;
    if (profile) {
      name = profile.name;
    }

    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          <AppNav handleLoginClick={lock} handleLogoutClick={logout} isLoggedIn={isAuthenticated} fullName={name}/>
          {this.renderErrorMessage()}
          <Container className="main">
            <Segment attached>{children}</Segment>
          </Container>
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
  router: React.PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(state => ({
  profile: state.auth0.profile,
  isAuthenticated: state.auth0.isAuthenticated,
  authLoading: state.auth0.loading
}),{loadAuth, lock, logout})(App)
