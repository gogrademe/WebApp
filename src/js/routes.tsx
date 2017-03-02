import * as React from 'react';
import {Route, Redirect, IndexRedirect, IndexRoute} from 'react-router';

import App from './containers/App';
import Home from './components/Home';
import DashboardModule from './modules/DashboardModule';
import NotFoundModule from './modules/NotFoundModule';
import * as Course from './modules/classes';
import Grades from './modules/classes/detail';
import CourseSettings from './modules/classes/Settings';
import * as Setup from './modules/setup/Container';
import Terms from './modules/setup/Terms';
import TermForm from './modals/Term';
import PersonForm from './modals/Person';
import PersonDetail from './modules/people/detail';
import PeopleList from './modules/people/list';
import UserList from './modules/UserList';
import auth from './utils/AuthService';

const requireAuth = (nextState, replace) => {
  if (!auth.isLoggedIn) {
    replace({ pathname: '/' })
  }
}

// interface IndexR extends IndexRoute {
//   title: any;
// }
// }


// type Route = RRoute & OwnProps;
export default(store) => (
    <Route path="/" component={App} auth={auth}>
      {/* <IndexRoute component={Home} onEnter={redirectIfLoggedIn}/> */}
      {/* <IndexRedirect to="/app"/> */}
      <Route path="/app" onEnter={requireAuth}>
        <IndexRoute title="Dashboard" component={DashboardModule}/>
        <Route path="people">
          <IndexRoute component={PeopleList}/>
          <Route path="new" component={PersonForm}/>
          <Route path=":id" component={PersonDetail}/>
        </Route>
        <Route path="users" component={UserList}/>
        <Route path="course">
          <IndexRoute component={Course.List}/>
          <Route path=":term_id/:resourceID" component={Course.View}>
            <Route title="Grades" path="grades" component={Grades}/>
            <Route title="Students" path="students" component={Course.Students}/>
            <Route title="Assignments" path="assignments" component={Course.Assignments}/>
            <Route title="Settings" path="settings" component={CourseSettings}/>
          </Route>
        </Route>
        <Route path="setup" component={Setup.Container}>
          <Route path="terms" component={Terms}/>
          <Route title="Create Term" path="terms/new" component={TermForm}/>
        </Route>
      </Route>
    </Route>
);

// {
//   props.auth.login();
// }
