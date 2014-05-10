
var Panel = require('../components/Panel.jsx');

var Routed = require('Reactful-Router');
var Link = Routed.Link;
var Router = Routed.Router;


var DashboardPage = React.createClass({
  mixins: [Router],
  render: function() {
        return (
        <Panel title="Dashboard" hasBody>
           The requested page could not be found.
        </Panel>
        );
    }
  });

module.exports = DashboardPage;