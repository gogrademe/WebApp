/** @jsx React.DOM */

require('../less/styles.less');


React = require('react/addons');
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
console.log(flux);
AppCfg = {
  apiUrl: 'http://localhost:3088/api'
};

var ReactRouter = require('react-router');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

// var NotFound = ReactRouter.NotFound;


var Header = require('./components/Header.jsx');
var LoginPage = require('./pages/LoginPage.jsx');
var DashboardPage = require('./pages/Dashboard.jsx');
var ClassesPage = require('./pages/ClassesPage.jsx');
// var StudentsPage = require('./pages/StudentsPage.jsx');
// var NotFountPage = require('./pages/NotFoundPage.jsx');

var Main = React.createClass({
    mixins: [FluxMixin],
  render: function() {
    return this.transferPropsTo(
        <Routes handler={App}>
          <Route name="login" path="login" handler={LoginPage} />
          <Route name="dashboard" handler={DashboardPage} />
          <Route name="classes" path="classes" handler={ClassesPage} />
        </Routes> 
      );
  }
});

var App = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("AuthStore")],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    console.log(flux);
    return {
      Auth: flux.store("AuthStore").getState()
    }
  },
  componentWillMount: function() {
    if (this.state.Auth.isLoggedIn !== true) {
        ReactRouter.replaceWith('login', {});
    }
  },
  render: function() {
    console.log(this.state.Auth.currentUser);
    return (
        <div>
            <Header isLoggedIn={this.state.Auth.isLoggedIn} currentUser={this.state.Auth.currentUser}/>
            <div className="container">
            {this.props.activeRoute}
            </div>
        </div>
    );
  }
});

      // <Locations>
      //   <Location path="/*" handler={Root} isLoggedIn={this.state.AuthStore.isLoggedIn} isLoggingIn={this.state.AuthStore.isLoggingIn}/>
      // </Locations>




          // <Route path="/dashboard" handler={DashboardPage} />
          // <Route path="/classes/*" handler={ClassesPage} />
          // <Route path="/students/*" handler={StudentsPage} />

React.renderComponent(<Main flux={flux}/>, document.getElementById('app'));