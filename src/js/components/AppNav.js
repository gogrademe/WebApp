import * as React from 'react';
import MenuLink from './MenuLink';

import { Container, Dropdown, Menu } from 'semantic-ui-react';

const AppNav = ({handleLogoutClick, fullName=''}) => (
  <Menu attached borderless stackable>
    <Container>
      <Menu.Item header>GoGradeMe</Menu.Item>
      <MenuLink to="/" name="Dashboard" exact />
      <MenuLink to="/course" name="Courses" />
      <MenuLink to="/people" name="People" />
      <MenuLink to="/users"  name="Users" />
      <MenuLink to="/setup"  name="Settings" />
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
