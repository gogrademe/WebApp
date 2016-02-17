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

const Login = ({onClick}) => (
  <Nav navbar pullRight>
    <NavItem onClick={onClick}>Login</NavItem>
  </Nav>
)

const Authenticated = ({fullName}) => (
  <div>
    <Nav navbar>
      <IndexLink to="/app"   display="Dashboard" />
      <Link to="/app/course" display="Courses" />
      <Link to="/app/people" display="People" />
      <Link to="/app/users"  display="Users" />
      <Link to="/app/setup"  display="Settings" />
    </Nav>
    <Nav navbar pullRight>
      <NavDropdown
        title={fullName}
        id='account-dropdown'>
        <Link to="/app/logout" display="Logout" />
      </NavDropdown>
    </Nav>
  </div>
)

const AppNav = ({isLoggedIn,handleLoginClick,fullName}) => (
  <Navbar className="app-nav">
    <Navbar.Header>
      <Navbar.Brand>
        GoGradeMe
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse eventKey={0}>
      {isLoggedIn ?
        <Authenticated fullName={fullName}/> :
        <Login onClick={handleLoginClick}/>
      }
    </Navbar.Collapse>
  </Navbar>
);

export default AppNav;
