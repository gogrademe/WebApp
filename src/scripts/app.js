/** @jsx React.DOM */

AppCfg = {
  apiUrl: 'http://localhost:3088/api'
};



require('../less/styles.less');
React = require('react');

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
var stores = {
  AuthStore: new AuthStore()
};

var AppRoutes = require('./routes.js');

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
      } else if (path === "/") {
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





RRouter.start(AppRoutes, function(view) {
  React.renderComponent(App({view: view, flux: flux}), document.getElementById('app'));
});
