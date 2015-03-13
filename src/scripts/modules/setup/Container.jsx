"use strict";

var React = require('react');
var Header = require('../../components/PageHeader');
var {RouteHandler, Link} = require('react-router');

var Container = React.createClass({
  render() {
    return (
      <div>
        <Header primary="App Setup" />
        <div className="main container">
          <div className="ui stackable grid">
            <div className="right floated three wide column">
              <div className="ui fluid vertical menu sunken">
                <Link className="item" to="setup.terms">
                  Terms
                </Link>
                <Link className="item" to="setup.assignment-types">
                  Assignment Types
                </Link>
              </div>
            </div>
            <div className="thirteen wide column">
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
  AssignmentTypes: require('./AssignmentTypes'),
  Terms: require('./Terms'),
};
