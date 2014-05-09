var React = require('react');
var Router = require('react-router-component');

var Header = require('./components/header/header');

var AuthStore = require('./stores/AuthStore');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var LoginPage = require('./pages/LoginPage.jsx');
var ClassMain = require('./pages/class/ClassContainerPage.js');
var NotFoundPage = require('./pages/NotFoundPage.jsx');
function getAppState() {
    return {
        currentUser: AuthStore.getCurrentUser(),
        isLoggedIn: AuthStore.isLoggedIn()
    };
}

var GoGradeApp = React.createClass({

  getInitialState: function () {
    return getAppState();
  },
  componentWillMount: function () {
    AuthStore.addChangeListener(this._onChange);
  },
  render : function() {
    return (
      <div>
        <Header loggedIn={this.state.isLoggedIn}/>
        <div className="container">
        <Locations>
          <Location path="/" handler={LoginPage} active="home"/>
          <Location path="/classes/*" handler={ClassMain} />
          <NotFound handler={NotFoundPage} />
        </Locations>
        </div>
      </div>)
  },
  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = GoGradeApp;
