/** @jsx React.DOM */

require('../less/styles.less');

React = require('react');

var Routed = require('Reactful-Router');
var Link = Routed.Link;
var Router = Routed.Router;

var Header = require('./components/Header.jsx');
var LoginPage = require('./pages/LoginPage.jsx');
var DashboardPage = require('./pages/Dashboard.jsx');

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
      <Root isLoggedIn={this.state.isLoggedIn}>
        <DashboardPage path="/"/>
        <LoginPage path="/login"/>
        <DashboardPage path="/dashboard"/>
      </Root>
    );
  },
  _onChange: function() {
    this.setState(getAppState());
  }
});

var Root = React.createClass({
  mixins: [Router],
  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps');
    if(this.props.isLoggedIn == false && nextProps.isLoggedIn == true) {
      this.navigate('/dashboard');
    }
  },
  // componentWillMount: function() {
  //   console.log('componentWillMount');
  //   if (this.props.isLoggedIn != true) {
  //     return this.navigate('/login');
  //   } else if (this.props.currentPath == '/login') {
  //     return this.navigate('/dashboard');
  //   }
  // },

  onBeforeNavigate: function(path) {
    console.log('onBeforeNavigate');
    if (this.props.isLoggedIn != true && path != "/login") {
      this.navigate('/login');
      return false;
    } else if (this.props.isLoggedIn === true && path === '/login') {
      this.navigate('/dashboard');
      return false;
    }

    return true;
  },
  render: function() {
    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn}/>
        <div className="container">
          {this.outlet()}
        </div>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('app'));