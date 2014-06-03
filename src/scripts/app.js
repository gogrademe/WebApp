/** @jsx React.DOM */

AppCfg = {
  apiUrl: 'http://localhost:3088/api'
};



require('../less/styles.less');
React = require('react');

// RRouter
var RRouter = require('rrouter');
var Routes = RRouter.Routes;
var Route = RRouter.Route;
var RoutingContextMixin = RRouter.RoutingContextMixin;

//Fluxxor
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AuthStore = require('./core/stores/AuthStore');
var actions = require('./core/actions/AuthActions');
var stores = {
  AuthStore: new AuthStore()
};



var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;


var Header = require('./components/Header.jsx');

var App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("AuthStore"), RoutingContextMixin],
    getStateFromFlux: function() {
      var flux = this.getFlux();

      return {
        Auth: flux.store("AuthStore").getState()
      }
    },
    componentWillMount: function() {
      var path = this.getRouting().path;

      // Handle login/logged out cases.
      if (!this.state.Auth.isLoggedIn) {
        this.navigate('/login');
      } else if(path === '/login') {
        this.navigate('/dashboard');
      }
    },
    render: function() {
      return (
        <div>
          <Header currentUser={this.state.Auth.currentUser} isLoggedIn={this.state.Auth.isLoggedIn}/>
          <div className="container">
            {this.props.view}
          </div>
        </div>
      );
    }
});

// Single pages
var DashboardModule = require('./modules/DashboardModule.jsx');
var LoginModule = require('./modules/LoginModule.jsx');

// Mountable
var ClassesModule = require('./modules/Classes');
var PeopleModule = require('./modules/People');

var NotFoundModule = require('./modules/NotFoundModule.jsx');
// <ClassesModule flux={flux} />
var routes = (
  <Routes flux={flux}>
      <Route name="dashboard" path="/dashboard" view={DashboardModule} flux={flux}/>
      <Route name="login" path="/login" view={LoginModule} flux={flux}/>
      <Route path="/classes" >
        <ClassesModule flux={flux} />
      </Route>
      <Route path="/people" >
        <PeopleModule flux={flux} />
      </Route>
      <Route name="notfound" path="*" view={NotFoundModule} flux={flux}/>
  </Routes>
);




RRouter.start(routes, function(view) {
  React.renderComponent(App({view: view, flux: flux}), document.getElementById('app'));
});
