var React = require('react');
var Panel = require('../components/Panel.jsx');

// var Routed = require('Reactful-Router');
// var Link = Routed.Link;
// var Router = Routed.Router;
var utils = require('../utils.js');

var NotFoundPage = React.createClass({
  render: function() {
    var requested = window.location.search;
    requested = utils.getParam(requested, 'req', false);
    console.log(requested);
    return (
        <Panel title="Oops! - Page Not Found" hasBody>
           We couldn't find the page you requested.
        </Panel>
        );
    }
  });

module.exports = NotFoundPage;
