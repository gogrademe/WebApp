import React from 'react';

import Router from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  CollapsibleNav
} from 'react-bootstrap';

import api from '../api/api';
import auth from '../api/auth';


import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
const Link = ({to,display}) => (
  <LinkContainer to={to}>
    <NavItem>{display}</NavItem>
  </LinkContainer>
);
const IndexLink = ({to,display}) => (
  <IndexLinkContainer to={to}>
    <NavItem>{display}</NavItem>
  </IndexLinkContainer>
);

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
            <IndexLink to="/app"   display="Dashboard" />
            <Link to="/app/course" display="Courses" />
            <Link to="/app/people" display="People" />
            <Link to="/app/users"  display="Users" />
            <Link to="/app/setup"  display="Settings" />
          </Nav>
          <Nav navbar pullRight>
            <NavDropdown
              title={this.userDisplayName()}
              id='account-dropdown'>
              <Link to="/app/logout" display="Logout" />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = HeaderNav;
