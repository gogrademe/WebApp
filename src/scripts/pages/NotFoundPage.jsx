
var Panel = require('../components/Panel.jsx');

// var Routed = require('Reactful-Router');
// var Link = Routed.Link;
// var Router = Routed.Router;


var NotFoundPage = React.createClass({

  render: function() {
        return (
        <Panel title="Oops!" hasBody>
           The requested page could not be found.
        </Panel>
        );
    }
  });

module.exports = NotFoundPage;