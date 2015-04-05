
import React from 'react';
import {Route, Redirect, NotFoundRoute} from 'react-router';
import App from './app.jsx';
import SignedIn from './components/SignedIn.jsx';
import LoginModule from './modules/LoginModule.ls';
import LogoutModule from './modules/Logout';
import DashboardModule from './modules/DashboardModule';
import NotFoundModule from './modules/NotFoundModule';
import Classes from './modules/classes/index';
import Setup from './modules/setup/Container';
import People from './modules/people/index';
import School from './modules/SchoolSettings.ls';
import UserList from './modules/UserList';

export default (
  <Route handler={App}>
    <Route name="login" handler={LoginModule} />
    <Route handler={SignedIn}>
      <Route name="logout" handler={LogoutModule} />
      <Route name="school.settings" path="school/settings" handler={School.Settings} />
      <Route name="people" handler={People.List} />
      <Route name="users" handler={UserList} />
      <Route name="people.detail" path="people/:resourceId" handler={People.Detail} />
      <Route name="class" handler={Classes.List} />
      <Route path="class/:termId/:resourceId" handler={Classes.View}>
        <Route name="class.overview" title="Overview" path="overview" handler={Classes.Overview} />
        <Route name="class.grades" title="Grades" path="grades" handler={Classes.Grades} />
        <Route name="class.students" title="Students" path="students" handler={Classes.Students} />
        <Route name="class.assignments" title="Assignments" path="assignments" handler={Classes.Assignments} />
        <Route name="class.settings" title="Settings" path="settings" handler={Classes.Settings} />
      </Route>
      <Route name="setup" handler={Setup.Container}>
        <Route name="setup.assignment-types" path="assignment-types" handler={Setup.AssignmentTypes} />
        <Route name="setup.terms" path="terms" handler={Setup.Terms} />
      </Route>
      <Route name="dashboard" path="dashboard" title="Dashboard" handler={DashboardModule} />
      <Redirect path="/" to="dashboard" />
    </Route>
    <NotFoundRoute handler={NotFoundModule} />
  </Route>
);
