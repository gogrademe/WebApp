/** @jsx React.DOM */

require('../less/styles.less');

React = require('react');

// var Routed = require('Reactful-Router');
// var Link = Routed.Link;
// var Router = Routed.Router;

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;


var Header = require('./components/Header.jsx');
var LoginPage = require('./pages/LoginPage.jsx');
var DashboardPage = require('./pages/Dashboard.jsx');
var ClassesPage = require('./pages/ClassesPage.jsx');

var NotFountPage = require('./pages/NotFoundPage.jsx');



var AuthStore = require('./core/stores/AuthStore');

function getAppState() {
    return {
        currentUser: AuthStore.getCurrentUser(),
        isLoggedIn: AuthStore.isLoggedIn()
    };
}
var App = React.createClass({
  getInitialState: function () {
    return getAppState();
  },
  componentWillMount: function () {
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    AuthStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <Locations>
        <Location path="/*" handler={Root} isLoggedIn={this.state.isLoggedIn}/>
      </Locations>
    );
  },
  _onChange: function() {
    this.setState(getAppState());
  }
});

var Root = React.createClass({
  // componentWillReceiveProps: function(nextProps) {
  //   console.log('componentWillReceiveProps');
  //   if(this.props.isLoggedIn == false && nextProps.isLoggedIn == true) {
  //     this.navigate('/dashboard');
  //   }
  // },
  // componentWillMount: function() {
  //   console.log('componentWillMount');
  //   if (this.props.isLoggedIn != true) {
  //     return this.navigate('/login');
  //   } else if (this.props.currentPath == '/login') {
  //     return this.navigate('/dashboard');
  //   }
  // },

  // onBeforeNavigate: function(path) {
  //   console.log('onBeforeNavigate');
  //   if (this.props.isLoggedIn != true && path != "/login") {
  //     this.navigate('/login');
  //     return false;
  //   } else if (this.props.isLoggedIn === true && path === '/login') {
  //     this.navigate('/dashboard');
  //     return false;
  //   }

  //   // console.log(History.checkUrl());

  //   return true;
  // },
  render: function() {
    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn}/>
        <div className="container">
        <Locations contextual>
          <Location path="/" handler={LoginPage} />
          <Location path="/dashboard" handler={DashboardPage} />
          <Location path="/classes/*" handler={ClassesPage} />
          <NotFound handler={NotFountPage} />
        </Locations>
        </div>
      </div>
    );
  }
});
     /**   <Locations contextual>
        <Location path="/test" handler={DashboardPage}/>

        </Locations> */

        // <Location path="/login"/>
        // <Location path="/dashboard"/>
        // <Location path="/classes" />

React.renderComponent(<App/>, document.getElementById('app'));