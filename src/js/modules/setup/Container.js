

import React from 'react';
import Header from '../../components/PageHeader';
import {Route, Switch} from 'react-router-dom';
import Terms from './Terms';
import TermForm from '../../modals/Term';

import MenuLink from '../../components/MenuLink';
import {Menu, Segment } from 'semantic-ui-react';

const Container = ({match}) => (
  <div>
    <Header primary="App Setup" />
    <Menu pointing attached>
      <MenuLink to="/setup" name="Terms"/>
    </Menu>
    <Switch>
      <Route path={`${match.path}`} component={Terms} exact/>
      <Route path={`${match.path}/terms/new`} component={TermForm}/>
    </Switch>
  </div>
);

module.exports = {
  Container: Container,
  Terms: require('./Terms')
};
