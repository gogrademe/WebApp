"use strict";
var React = require('react');

var Header = require('../components/Header');
var Panel = require('../components/Panel');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <Header title="Not Found!" />
        <Panel title="404 Page" hasBody={true}>
          Page not found.
        </Panel>
      </div>
    );
  }
});
