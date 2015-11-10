

import React from 'react';
import Header from '../../components/PageHeader';
import {RouteHandler} from 'react-router';
import {Nav} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

var Container = React.createClass({
  render() {
    return (
      <div>
        <Header primary="App Setup" />
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-2">
              <Nav bsStyle='pills' stacked>
                <NavItemLink to="setup.terms">
                  Terms
                </NavItemLink>
              </Nav>
            </div>
            <div className="col-sm-12 col-md-10">
              <RouteHandler />
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
