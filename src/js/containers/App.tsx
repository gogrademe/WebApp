import * as React from "react";
import { Container, Segment } from "semantic-ui-react";

import { observer } from "mobx-react";

import AppNav from "../components/AppNav";

import auth from "../utils/AuthService";

import { BrowserRouter as Router, Route } from "react-router-dom";

import PeopleList from "../modules/people/list";
import UserList from "../modules/UserList";
import CourseApp from "../modules/classes";

import CourseList from "../modules/classes/list";
import DashboardModule from "../modules/DashboardModule";
import * as Setup from "../modules/setup/Container";

interface AppProps {
  // errorMessage: string;
  // isAuthenticated: boolean;
  // authLoading: boolean;
  // route: any;
  // auth: any;
  // profile: any;
  // resetErrorMessage: any;
  // children: any;
}

@observer
class App extends React.Component<AppProps, undefined> {
  // static contextTypes = {
  //   // router: React.PropTypes.object.isRequired,
  //   store: React.PropTypes.object.isRequired
  // }

  // handleDismissClick = (e) => {
  //   this.props.resetErrorMessage();
  //   e.preventDefault();
  // }

  componentDidMount() {
    if (!auth.isLoggedIn) {
      // this.props.replace('/',{from: this.props.location})
      auth.login();
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   const {profile,isAuthenticated, authLoading} = this.props;
  //   const {push} = this.context.router;
  //   if (!isAuthenticated && nextProps.isAuthenticated) {
  //     // login
  //     push('/app');
  //   } else if (!nextProps.isAuthenticated && !nextProps.authLoading) {
  //     // this.props.lock()
  //   }
  // }
  // renderErrorMessage() {
  //   const { errorMessage } = this.props;
  //   if (!errorMessage) {
  //     return null
  //   }
  //
  //   return (
  //     <p style={{ backgroundColor: '#e99', padding: 10 }}>
  //       <b>{errorMessage}</b>
  //       {' '}
  //       (<a href="#"
  //           onClick={this.handleDismissClick}>
  //         Dismiss
  //       </a>)
  //     </p>
  //   )
  // }

  handleLogoutClick = () => {
    // const {route: auth} = this.props;
    // const {push} = this.context.router;
    // push('/');
    // auth.logout();
  };

  render() {
    // const {profile} = this.props;
    // var name;
    // if (profile) {
    //   name = profile.name;
    // }
    const name = "";
    return (
      <Router>
        <div>
          {/*<DocumentTitle title='GoGradeMe'> */}
          {auth.isLoggedIn && <AppNav fullName={name} handleLogoutClick={auth.logout} />}
          <Container className="main">
            <Segment attached>
              <Route path="/" component={DashboardModule} exact />
              <Route path="/people" component={PeopleList} />
              <Route path="/users" component={UserList} />
              <Route path="/course" component={CourseList} exact />
              <Route path="/course/:termId/:resourceID" component={CourseApp} />
              <Route path="/setup" component={Setup.Container} />
            </Segment>
          </Container>
          {/*</DocumentTitle>*/}
        </div>
      </Router>
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
