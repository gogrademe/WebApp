/** @jsx React.DOM */

'use strict';
var React = require('react');
var Panel = require('../../components/Panel.jsx');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;
var Link = require('rrouter').Link;

var Fluxxor = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var Grid = require('react-grid');


var LinkCell = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="detail/home" currentClass={this.props.value}>{this.props.value} </Link>
      </div>
    );
  }
});

var columns = [
  {
    name: 'Id',
    width: '20%',
    key: 0
  },
  {
    name: 'Class Name',
    width: '20%',
    key: 1,
    renderer: LinkCell
  },
  {
    name: 'Grade Level',
    width: '20%',
    key: 2
  },
  {
    name: 'Teacher',
    width: '40%',
    key: 3
  }
];

function rows(start, end) {
  var rows = [];
  for (var i = start; i < end; i++) {
    rows.push([i, 'Class Name ' + i, 'Grade Level ' + i, 'Teacher Name ' + i]);
  }
  return rows;
}



var ClassList = React.createClass({
  mixins: [RoutingContextMixin, FluxChildMixin],
  componentWillMount: function() {
    flux.actions.getAllClasses();
  },
  render: function() {
    return (
        <Panel title="All Classes" className="content-area">
          <Grid
            columns={columns}
            length={10000}
            rows={rows}
            rowHeight={40}
            />
        </Panel>
    );
  }
});

module.exports = ClassList;
