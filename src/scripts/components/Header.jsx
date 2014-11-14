
var React = require('react');
var Logo = require('../atoms/Logo');
var {Router, Link} = require('react-router');
var select = require('./src/modules/Dropdown.ls');
var api = require('../api/api.ls');
var auth = require('../api/auth.ls');

var HeaderNav = React.createClass({
  displayName: "HeaderNav",
  userDisplayName: function(){
    return this.state.person.firstName + " " + this.state.person.lastName;
  },
  componentWillMount: function(){
    var personId, this$ = this;
    personId = auth.currentUser().personId;
    if (personId) {
      return api.person.get(personId).then(function(it){
        return this$.setState({
          person: it
        });
      }).error(function(){
        return Router.replaceWith("/logout");
      });
    }
  },
  getInitialState: function(){
    return {
      person: {}
    };
  },
  render: function() {
    return (
      <div className="ui fixed blue inverted main menu">
        <div className="container">
          <div className="title item">
            GoGradeMe
          </div>
          <Link className="item" to="dashboard">
            <i className="dashboard icon" />
              Dashboard
          </Link>
          <Link className="item" to="class">
            Classes
          </Link>
          <Link className="item" to="people">
            <i className="users icon"/>
            People
          </Link>
          <Link className="item" to="setup">
            App Setup
          </Link>
          <div className="right menu">
            <div className="item">
              {this.userDisplayName()}
            </div>
            <Link className="item" to="logout">
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
});

// <img className="logo" src="logo-only.svg"/>

module.exports = HeaderNav;
