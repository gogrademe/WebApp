var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var ClassSettings = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin],
  render: function() {
    return (
        <Panel hasBody title="Settings" className="content-area">
          Settings Page
        </Panel>
    );
  }
});

module.exports = ClassSettings;
