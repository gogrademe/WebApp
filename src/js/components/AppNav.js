import * as React from 'react';
import MenuLink from './MenuLink';

import { Container, Dropdown, Menu } from 'semantic-ui-react';

const AppNav = ({handleLogoutClick, fullName=''}) => (
  <Menu attached borderless stackable>
    <Container>
      <Menu.Item header>GoGradeMe</Menu.Item>
      <MenuLink to="/app" name="Dashboard" onlyActiveOnIndex />
      <MenuLink to="/app/course" name="Courses" />
      <MenuLink to="/app/people" name="People" />
      <MenuLink to="/app/users"  name="Users" />
      <MenuLink to="/app/setup"  name="Settings" />
      <Menu.Menu position='right'>
      <Dropdown as={Menu.Item} text={fullName} simple>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default AppNav;
