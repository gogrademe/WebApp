var React = require('react');
var Panel = require('../components/Panel.jsx');

// var Routed = require('Reactful-Router');
// var Link = Routed.Link;
// var Router = Routed.Router;


var DashboardModule = React.createClass({

  render: function() {
        return (
        <Panel title="Dashboard" hasBody>
           This will be a cool dashboard soon!
        </Panel>
        );
    }
  });

module.exports = DashboardModule;
