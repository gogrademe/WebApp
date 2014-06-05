var React = require('react');
var Panel = require('../components/Panel.jsx');

// var Routed = require('Reactful-Router');
// var Link = Routed.Link;
// var Router = Routed.Router;


var DashboardModule = React.createClass({

  render: function() {
        return (
        <Panel title="Dashboard" hasBody>
           Welcome to the test version of Cuane Gradebook.
        </Panel>
        );
    }
  });

module.exports = DashboardModule;
