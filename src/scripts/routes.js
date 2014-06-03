/** @jsx React.DOM */

var RRouter = require('rrouter');
var Routes = RRouter.Routes;
var Route = RRouter.Route;


// Single pages
var DashboardModule = require('./modules/DashboardModule.jsx');
var LoginModule = require('./modules/LoginModule.jsx');

// Mountable
var ClassesModule = require('./modules/Classes');
var PeopleModule = require('./modules/People');

var NotFoundModule = require('./modules/NotFoundModule.jsx');

module.exports = (
  <Routes>
      <Route name="dashboard" path="/dashboard" view={DashboardModule}/>
      <Route name="login" path="/login" view={LoginModule}/>
      <Route path="/classes" >
        {ClassesModule}
      </Route>
      <Route path="/people" >
        <PeopleModule />
      </Route>
      <Route name="notfound" path="*" view={NotFoundModule}/>
  </Routes>
);
