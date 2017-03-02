import * as React from 'react';
import { Container, Segment } from 'semantic-ui-react'
import * as DocumentTitle from 'react-document-title';

import { observer } from 'mobx-react';

import AppNav from '../components/AppNav';

// export interface PersonModalProps { person_id: string; personStore: any; }
// App.propTypes = {
//   // Injected by React Redux
//   errorMessage: PropTypes.string,
//   // resetErrorMessage: PropTypes.func.isRequired,
//   // inputValue: PropTypes.string.isRequired,
//   // Injected by React Router
//   children: PropTypes.node
// }
interface AppProps {
  errorMessage: string;
  isAuthenticated: boolean;
  authLoading: boolean;
  route: any;
  auth: any;
  profile: any;
  resetErrorMessage: any;
  children: any;
}

@observer class App extends React.Component<AppProps,undefined> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  }

  handleDismissClick = (e) => {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  componentDidMount() {
    const {auth} = this.props.route;
    if (!auth.isLoggedIn) {
      auth.login()
    }

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

  handleLogoutClick = () => {
    const {route: auth} = this.props;
    const {push} = this.context.router;
    push('/');
    auth.logout();
  }

  render() {
    const {route: {auth}, profile} = this.props;
    var name;
    if (profile) {
      name = profile.name;
    }

    let children = null;
    if (this.props.children) {

      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <DocumentTitle title='GoGradeMe'>
        <div>
          {auth.isLoggedIn&&
            <AppNav fullName={name} handleLogoutClick={auth.logout} />}
          <Container className="main">
            <Segment attached>{children}</Segment>
          </Container>
        </div>
      </DocumentTitle>
    );
  }
}

//
// export default connect(state => ({
//   profile: state.auth0.profile,
//   isAuthenticated: state.auth0.isAuthenticated,
//   authLoading: state.auth0.loading
// }),{loadAuth, lock, logout})(App)

export default App;
