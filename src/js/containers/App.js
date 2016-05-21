import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import { routeActions } from 'react-router-redux'
import {connect} from 'react-redux';

import AppNav from '../components/AppNav';

// Hosts
import ModalHost from '../host/ModalHost';

import { load as loadAuth, login } from '../redux/modules/auth0';

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
  // componentWillReceiveProps(nextProps) {
  //   const {user,push} = this.props;
  //   if (!user && nextProps.user) {
  //     // login
  //     push('/app');
  //   } else if (user && !nextProps.user) {
  //     // logout
  //     push('/');
  //   }
  // }

  // loggedIn() {
  //   if (this.props.isAuthenticated) {return ;}
  // }
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
    const {children, isAuthenticated,login, profile={}} = this.props;
    var name;
    if (profile) {
      name = profile.name;
    }
    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          <AppNav handleLoginClick={login} isLoggedIn={isAuthenticated} fullName={name}/>
          {this.renderErrorMessage()}
          <div className="main container">
            {children}
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
//
//
// export default connect(state => ({
//   assignments: state.entities.assignments,
//   attempts: state.entities.attempts
// }),{loadAssignments,loadGradebook})(ClassDetail);

export default connect(state => ({
  profile: state.auth0.profile,
  isAuthenticated: state.auth0.isAuthenticated
}),{loadAuth,...routeActions, login})(App)
