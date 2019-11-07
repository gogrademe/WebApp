import React from 'react';

import {
  Nav,
  NavItem,
  NavDropdown
} from 'react-bootstrap';

import {LinkContainer} from 'react-router-bootstrap';

export default ({courseId, termId}) => (
  <Nav bsStyle='pills' stacked>
    <LinkContainer to={`/course/${termId}/${resourceID}/grades`}>
      <NavItem>Grades</NavItem>
    </LinkContainer>
    <LinkContainer to={`/course/${termId}/${resourceID}/students`}>
      <NavItem>Students</NavItem>
    </LinkContainer>
    <LinkContainer to={`/course/${termId}/${resourceID}/assignments`}>
      <NavItem>Assignments</NavItem>
    </LinkContainer>
    <LinkContainer to={`/course/${termId}/${resourceID}/settings`}>
      <NavItem>Settings</NavItem>
    </LinkContainer>
  </Nav>
);
