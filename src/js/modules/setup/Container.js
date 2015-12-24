

import React from 'react';
import Header from '../../components/PageHeader';
import {RouteHandler} from 'react-router';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

var Container = React.createClass({
  render() {
    return (
      <div>
        <Header primary="App Setup" />
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-2">
              <Nav bsStyle='pills' stacked>
                <LinkContainer to="/app/setup/terms">
                  <NavItem>Terms</NavItem>
                </LinkContainer>
              </Nav>
            </div>
            <div className="col-sm-12 col-md-10">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = {
  Container: Container,
  Terms: require('./Terms')
};
