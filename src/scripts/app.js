/** @jsx React.DOM */

// 'use strict';
AppCfg = {
  apiUrl: 'http://localhost:3000/api'
};
// AppCfg = {
//   apiUrl: 'http://private-63e8-cunaegradebook.apiary-mock.com/api'
// };



require('../less/styles.less');
React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');

// RRouter
var RRouter = require('rrouter');
var RoutingContextMixin = RRouter.RoutingContextMixin;

//Fluxxor
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// Stores
var AuthStore = require('./core/stores/AuthStore');
var actions = require('./core/actions/AuthActions');
var ClassesStore = require('./core/stores/ClassesStore');
var PeopleStore = require('./core/stores/PeopleStore');

var stores = {
  AuthStore: new AuthStore(),
  ClassesStore: new ClassesStore(),
  PeopleStore: new PeopleStore()
};

var AppRoutes = require('./routes.js');

var flux = new Fluxxor.Flux(stores, actions);

var Header = require('./components/Header.jsx');

var App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("AuthStore"), RoutingContextMixin],
    getStateFromFlux: function() {
      var flux = this.getFlux();

      return {
        Auth: flux.store("AuthStore").getState()
      };
    },
    render: function() {
      var path = this.getRouting().path;

      // Handle login/logged out cases.
      if (!this.state.Auth.isLoggedIn) {
        this.navigate('/login');
      } else if(path === '/login') {
        this.navigate('/dashboard');
      } else if (path === "/") {
        this.navigate('/dashboard');
      }

      // This is needed to pass the current context to the View.
      var View = cloneWithProps(this.props.view, {});
      return (
        <div>
          <Header currentUser={this.state.Auth.currentUser} isLoggedIn={this.state.Auth.isLoggedIn}/>
          <div className="container">
            {View}
          </div>
        </div>
      );
    }
});





RRouter.start(AppRoutes, function(view) {
  React.renderComponent(App({view: view, flux: flux}), document.getElementById('app'));
});
