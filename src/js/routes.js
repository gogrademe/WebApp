import React from 'react';
import {Route, Redirect, IndexRedirect, IndexRoute} from 'react-router';

import App from './containers/App';
import Home from './components/Home';
import LogoutModule from './modules/Logout';
import DashboardModule from './modules/DashboardModule';
import NotFoundModule from './modules/NotFoundModule';
import Course from './modules/classes';
import Grades from './modules/classes/detail';
import CourseSettings from './modules/classes/Settings';
import Setup from './modules/setup/Container';
import Terms from './modules/setup/Terms';
import People from './modules/people/index';
import PeopleList from './modules/people/list';
import UserList from './modules/UserList';

import { login } from './redux/modules/auth0';

export default(store) => {
  const requireAuth = (nextState, replace) => {
    const {auth0} = store.getState();


    if (!auth0.isAuthenticated) {
      // store.dispatch(login)
      // login


      // actions.alerts.warning('You have to be signed in first');
      actions.auth.loginRequired(nextState.location.pathname);
      replace('/');
    }
  };
  const redirectIfLoggedIn = (_, replace) => {
    const {auth0} = store.getState();
    if (auth0.isAuthenticated) {
      replace('/app/');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={redirectIfLoggedIn}/>
      <Route path="/app" onEnter={requireAuth}>
        <IndexRoute title="Dashboard" component={DashboardModule}/>
        <Route path="people">
          <IndexRoute component={PeopleList}/>
          <Route path="people/:resourceID" component={People.Detail}/>
        </Route>
        <Route path="users" component={UserList}/>
        <Route path="course">
          <IndexRoute component={Course.List}/>
          <Route path=":term_id/:resourceID" component={Course.View}>
            <Route title="Overview" path="overview" component={Course.Overview}/>
            <Route title="Grades" path="grades" component={Grades}/>
            <Route title="Students" path="students" component={Course.Students}/>
            <Route title="Assignments" path="assignments" component={Course.Assignments}/>
            <Route title="Settings" path="settings" component={CourseSettings}/>
          </Route>
        </Route>
        <Route path="setup" component={Setup.Container}>
          <Route path="terms" component={Terms}/>
        </Route>
      </Route>
    </Route>
  )
}
