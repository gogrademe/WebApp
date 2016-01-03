import React from 'react';

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown
} from 'react-bootstrap';

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

const AppNav = ({personName}) => (
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
          title={personName}
          id='account-dropdown'>
          <Link to="/app/logout" display="Logout" />
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppNav;
