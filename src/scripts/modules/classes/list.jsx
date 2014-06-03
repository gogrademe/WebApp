var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var Table = require('../../components/Table.jsx');

var ClassList = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin],
  render: function() {
    return (
        <Panel title="All Classes" className="content-area">
          <Table />
        </Panel>
    );
  }
});

module.exports = ClassList;
