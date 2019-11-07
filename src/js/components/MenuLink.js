import React from 'react';
import { NavLink } from 'react-router-dom';

import { Menu } from 'semantic-ui-react'

export default (props) => <Menu.Item as={NavLink} activeClassName='active' {...props} />;
