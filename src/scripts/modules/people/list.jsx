var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var PeopleList = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin],
  render: function() {
    return (
        <Panel hasBody title="People" className="content-area">
          People page
        </Panel>
    );
  }
});

module.exports = PeopleList;
