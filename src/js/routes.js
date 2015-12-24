
import React from 'react';
import {Route, Redirect, IndexRedirect, IndexRoute} from 'react-router';

import App from './app';
import LoginModule from './modules/LoginModule';
import LogoutModule from './modules/Logout';
import DashboardModule from './modules/DashboardModule';
import NotFoundModule from './modules/NotFoundModule';
import Course from './modules/classes';
import Grades from './modules/classes/detail';
import CourseSettings from './modules/classes/Settings';
import Setup from './modules/setup/Container';
import People from './modules/people/index';
import UserList from './modules/UserList';

import { isLoaded as isAuthLoaded, load as loadAuth } from './redux/modules/auth';

import api from './api/api';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      if (!api.session.get()) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login');
      }
      cb();
    }
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };
  return (
    <Route path="/" component={App}>
        <Route path="login" component={LoginModule} />
        <Route path="app" onEnter={requireLogin}>
          <IndexRoute title="Dashboard" component={DashboardModule} />
          <Route path="logout" component={LogoutModule} />
          <Route path="people"  >
            <IndexRoute component={People.List}/>
            <Route path="people/:resourceID" component={People.Detail} />
          </Route>
          <Route path="users" component={UserList} />
          <Route path="course" component={Course.List} />
          <Route path="course/:term_id/:resourceID" component={Course.View}>
            <Route title="Overview" path="overview" component={Course.Overview} />
            <Route title="Grades" path="grades" component={Grades} />
            <Route title="Students" path="students" component={Course.Students} />
            <Route title="Assignments" path="assignments" component={Course.Assignments} />
            <Route title="Settings" path="settings" component={CourseSettings} />
          </Route>
          <Route path="setup" component={Setup.Container}>
            <Route path="terms" component={Setup.Terms} />
          </Route>
        </Route>
      </Route>
  )
}
