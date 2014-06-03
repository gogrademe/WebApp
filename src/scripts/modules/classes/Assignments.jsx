var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var ClassAssignments = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin],
  render: function() {
    return (
        <Panel hasBody title="Assignments" className="content-area">
          Detail page!
        </Panel>
    );
  }
});

module.exports = ClassAssignments;
