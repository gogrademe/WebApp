

import React from 'react';
import Logo from '../atoms/Logo';
import {Router, Link} from 'react-router';
// import select from './src/modules/Dropdown';
import api from '../api/api';
import auth from '../api/auth';

var HeaderNav = React.createClass({
  userDisplayName(){
    return this.state.person.firstName + " " + this.state.person.lastName;
  },
  componentWillMount(){
    var personId, this$ = this;
    personId = auth.currentUser().personId;
    if (personId) {
      return api.person.get(personId).then(function(it){
        return this$.setState({
          person: it
        });
      });
    }
  },
  getInitialState(){
    return {
      person: {}
    };
  },
  render() {
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
          <Link className="item" to="users">
            <i className="users icon"/>
            Users
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

module.exports = HeaderNav;
