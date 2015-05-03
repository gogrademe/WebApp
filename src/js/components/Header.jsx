import React from 'react';

import Router from 'react-router';
import {Navbar, Nav, DropdownButton, CollapsibleNav} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

import api from '../api/api';
import auth from '../api/auth';

const HeaderNav = React.createClass({
  mixins: [Router.Navigation, Router.State],
  userDisplayName(){
    return this.state.person.firstName + ' ' + this.state.person.lastName;
  },
  componentWillMount(){
    const personId = auth.currentUser().personId;
    if (personId) {
      api.person
        .get(personId)
        .then((it) => {
          this.setState({
            person: it
          });
        });
    }
  },
  getInitialState(){
    return {
      person: {},
    };
  },
  render() {
    return (
      <Navbar className="app-nav" brand="GoGradeMe" toggleNavKey={0}>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <NavItemLink to="dashboard">
              Dashboard
            </NavItemLink>
            <NavItemLink to="class">
              Classes
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
