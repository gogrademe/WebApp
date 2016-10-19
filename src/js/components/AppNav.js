import React from 'react';
import MenuLink from './MenuLink';

import { Container, Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

// import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

// const Item = (props) => (
//   <Menu.Item activeClassName="active" as={Link} {...props} />
// );

const IndexLink = ({to,display}) => (
  <IndexLinkContainer to={to}>
    <NavItem>{display}</NavItem>
  </IndexLinkContainer>
);

const LoginButton = ({onClick}) => (
  <Menu navbar pullRight>
    <Menu.Item onClick={onClick}>Login</Menu.Item>
  </Menu>
)


// const Authenticated = ({fullName, onLogoutClick}) => (
//   <div>
//     <Nav navbar>
//       <IndexLink to="/app"   display="Dashboard" />
//       <Link to="/app/course" display="Courses" />
//       <Link to="/app/people" display="People" />
//       <Link to="/app/users"  display="Users" />
//       <Link to="/app/setup"  display="Settings" />
//     </Nav>
//     <Nav navbar pullRight>
//       <NavDropdown
//         title={fullName}
//         id='account-dropdown'>
//         <NavItem onClick={onLogoutClick}>Logout</NavItem>
//       </NavDropdown>
//     </Nav>
//   </div>
// )
const Authenticated = ({fullName, onLogoutClick}) => (
  <Menu.Menu>
    <MenuLink to="/app" name="Dashboard"  />
    <MenuLink to="/app/course" name="Courses" />
    <MenuLink to="/app/people" name="People" />
    <MenuLink to="/app/users"  name="Users" />
    <MenuLink to="/app/setup"  name="Settings" />
    <Menu.Menu navbar position='right'>
      <Dropdown as={Menu.Item} icon='wrench' simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='dropdown icon' />
            <span className='text'>New</span>

            <Dropdown.Menu>
              <Dropdown.Item>Document</Dropdown.Item>
              <Dropdown.Item>Image</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>Save...</Dropdown.Item>
          <Dropdown.Item>Edit Permissions</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Export</Dropdown.Header>
          <Dropdown.Item>Share</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <NavDropdown
        title={fullName}
        id='account-dropdown'>
        <NavItem onClick={onLogoutClick}>Logout</NavItem>
      </NavDropdown> */}
    </Menu.Menu>
  </Menu.Menu>
)

const AppNav = ({isLoggedIn, handleLoginClick, handleLogoutClick, fullName}) => (
  <Menu attached borderless stackable>
    <Container>
    <Menu.Item header>GoGradeMe</Menu.Item>
    <MenuLink to="/app" name="Dashboard" onlyActiveOnIndex />
    <MenuLink to="/app/course" name="Courses" />
    <MenuLink to="/app/people" name="People" />
    <MenuLink to="/app/users"  name="Users" />
    <MenuLink to="/app/setup"  name="Settings" />
    <Menu.Menu position='right'>
      <Dropdown as={Menu.Item} text={fullName || ''} simple>
        <Dropdown.Menu>
          {/* <Dropdown.Divider /> */}
          <Dropdown.Item onClick={handleLoginClick}>Login</Dropdown.Item>
          <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Menu.Menu>
    {/* {
      isLoggedIn ?
        <Authenticated fullName={fullName} onLogoutClick={handleLogoutClick} /> :
        <LoginButton onClick={handleLoginClick}/>
    } */}
    </Container>
  </Menu>
);
// const AppNav = ({isLoggedIn, handleLoginClick, handleLogoutClick, fullName}) => (
//   <Navbar className="app-nav">
//     <Navbar.Header>
//       <Navbar.Brand>
//         GoGradeMe
//       </Navbar.Brand>
//     </Navbar.Header>
//     <Navbar.Collapse>
//       {isLoggedIn ?
//         <Authenticated fullName={fullName} onLogoutClick={handleLogoutClick} /> :
//         <LoginButton onClick={handleLoginClick}/>
//       }
//     </Navbar.Collapse>
//   </Navbar>
// );

export default AppNav;
