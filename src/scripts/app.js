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
      console.log(flux);
      return {
        Auth: flux.store("AuthStore").getState()
      }
    },
  render: function() {
    return (
      <div>
        <Header />
        <div>
          {this.props.appView}
        </div>
      </div>
    );
  }
});

var LoginPage = require('./pages/LoginPage.jsx');

var routes = (
  <Routes>
    <Route name="app" path="/" view={App} flux={flux}>
      <Route name="login" path="login" appView={LoginPage} />
    </Route>
  </Routes>
);




RRouter.start(routes, function(view) {
  console.log(view);
  React.renderComponent(view, document.getElementById('app'));
});
