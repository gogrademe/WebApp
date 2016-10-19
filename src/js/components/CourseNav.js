import React from 'react';

import {
  Nav,
  NavItem,
  NavDropdown
} from 'react-bootstrap';

import {LinkContainer} from 'react-router-bootstrap';

export default ({course_id, term_id}) => (
  <Nav bsStyle='pills' stacked>
    <LinkContainer to={`/app/course/${term_id}/${resourceID}/grades`}>
      <NavItem>Grades</NavItem>
    </LinkContainer>
    <LinkContainer to={`/app/course/${term_id}/${resourceID}/students`}>
      <NavItem>Students</NavItem>
    </LinkContainer>
    <LinkContainer to={`/app/course/${term_id}/${resourceID}/assignments`}>
      <NavItem>Assignments</NavItem>
    </LinkContainer>
    <LinkContainer to={`/app/course/${term_id}/${resourceID}/settings`}>
      <NavItem>Settings</NavItem>
    </LinkContainer>
  </Nav>
);
