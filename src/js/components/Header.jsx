import React from 'react';

import Router from 'react-router';
import {
  Navbar,
  Nav,
  NavDropdown,
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
    return `${person.first_name} ${person.last_name}`;
  },
  componentWillMount() {
    const person_id = auth.currentUser().person_id;

    if (person_id) {
      api.person.get(person_id).then((it) => {
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
            <NavDropdown title={this.userDisplayName()} id='account-dropdown'>
              <NavItemLink to="logout">
                Logout
              </NavItemLink>
            </NavDropdown>
          </Nav>
        </CollapsibleNav>
      </Navbar>
    );
  }
});

module.exports = HeaderNav;
