import React from 'react';

import Router from 'react-router';
import {
  Navbar,
  Nav,
  DropdownButton,
  CollapsibleNav
} from 'react-bootstrap';

import {
  NavItemLink
} from 'react-router-bootstrap';

import api from '../api/api';
import auth from '../api/auth';

const HeaderNav = React.createClass({
  mixins: [
    Router.Navigation, Router.State
  ],
  getInitialState() {
    return {
      person: {}
    };
  },
  userDisplayName() {
    const person = this.state.person;
    return `${person.firstName} ${person.lastName}`;
  },
  componentWillMount() {
    const personID = auth.currentUser().personID;

    if (personID) {
      api.person.get(personID).then((it) => {
        this.setState({
          person: it
        });
      });
    }
  },
  render() {
    return (
      <Navbar brand="GoGradeMe" className="app-nav" toggleNavKey={0}>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <NavItemLink to="dashboard">
              Dashboard
            </NavItemLink>
            <NavItemLink to="course">
              Courses
            </NavItemLink>
            <NavItemLink to="people">
              People
            </NavItemLink>
            <NavItemLink to="users">
              Users
            </NavItemLink>
            <NavItemLink to="setup">
              App Setup
            </NavItemLink>
          </Nav>
          <Nav navbar right>
            <DropdownButton title={this.userDisplayName()}>
              <NavItemLink to="logout">
                Logout
              </NavItemLink>
            </DropdownButton>
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }
});

module.exports = HeaderNav;
