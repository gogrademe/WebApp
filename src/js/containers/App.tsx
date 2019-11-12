import React, { useEffect } from "react";
import { Container, Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppNav from "../components/AppNav";

import { useAuth0 } from "../hooks/auth0";

import PeopleList from "../modules/people/list";
import UserList from "../modules/UserList";
import CourseApp from "../modules/classes";

import CourseList from "../modules/classes/list";
import DashboardModule from "../modules/DashboardModule";
import * as Setup from "../modules/setup/Container";

const App = () => {
  const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect();
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect]);

  if (loading) {
    return <div>Loading...</div>;
  }

  let name;
  if (isAuthenticated) {
    name = user.name;
  }

  return (
    <Router>
      <div>
        <AppNav fullName={name} />
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
      </div>
    </Router>
  );
};

export default App;
