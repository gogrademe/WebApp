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
    mixins: [FluxMixin, StoreWatchMixin("AuthStore")],
    getStateFromFlux: function() {
      var flux = this.getFlux();

      return {
        Auth: flux.store("AuthStore").getState()
      }
    },
  render: function() {
    return this.transferPropsTo(
      <div>
        <Header currentUser={this.state.Auth.currentUser} isLoggedIn={this.state.Auth.isLoggedIn}/>
        <div flux={flux}>
          {this.props.view}
        </div>
      </div>
    );
  }
});

var LoginModule = require('./modules/LoginModule.jsx');

var routes = (
  <Routes flux={flux}>
      <Route name="login" view={LoginModule}/>
  </Routes>
);




RRouter.start(routes, function(view) {
  React.renderComponent(App({view: view, flux: flux}), document.getElementById('app'));
});
