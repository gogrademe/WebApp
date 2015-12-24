import React from 'react';

import Router from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  CollapsibleNav
} from 'react-bootstrap';

import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

import api from '../api/api';
import auth from '../api/auth';

const HeaderNav = React.createClass({
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
      <Navbar className="app-nav">
        <Navbar.Header>
          <Navbar.Brand>
            GoGradeMe
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse eventKey={0}>
          <Nav navbar>
            <IndexLinkContainer to="/app">
              <NavItem>
                Dashboard
              </NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/app/course">
              <NavItem>Courses</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/people">
              <NavItem>People</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/users">
              <NavItem>Users</NavItem>
            </LinkContainer>
            <LinkContainer to="/app/setup">
              <NavItem>App Setup</NavItem>
            </LinkContainer>
          </Nav>
          <Nav navbar pullRight>
            <NavDropdown title={this.userDisplayName()} id='account-dropdown'>
              <LinkContainer to="/app/logout">
                <NavItem>Logout</NavItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = HeaderNav;
