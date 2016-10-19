import React from 'react';
import { Link } from 'react-router'

import { Menu } from 'semantic-ui-react'

export default (props) => <Menu.Item activeClassName="active" as={Link} {...props} />;
