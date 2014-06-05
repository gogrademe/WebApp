/** @jsx React.DOM */

'use strict';
var React = require('react');
var BTable = require('react-bootstrap').Table;

var RRouter = require('rrouter');
var RoutingContextMixin = RRouter.RoutingContextMixin;

function defaultCellRenderer(props) {
  return props.value;
}

var Cell = React.createClass({
  getDefaultProps: function() {
    return {
      renderer: defaultCellRenderer
    };
  },
  render: function() {
    return (
      <td>
        {this.props.renderer({value: this.props.value})}
      </td>
    );
  }
});


var Row = React.createClass({
  render: function() {
    var children;
    
  }
})
// Table with random data. Will change this to take in props to define data soon.
var Table = React.createClass({
  mixins: [RoutingContextMixin],
  propTypes: {
    config: React.PropTypes.object.isRequired,
    linkTo: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      items: this.props.initialItems || [],
      // sort: this.props.config.sort || { column: "", order: "" },
      columns: this.props.config.columns
    };
  },
  componentWillReceiveProps: function(nextProps) {
    // Load new data when the dataSource property changes.
    if (nextProps.dataSource != this.props.dataSource) {
      this.loadData(nextProps.dataSource);
    }
  },
  componentWillMount: function() {
    this.loadData(this.props.dataSource);
  },
  loadData: function(dataSource) {
    if (!dataSource) return;

      this.setState({items: dataSource});

  },
  columnNames: function() {
     return Object.keys(this.state.columns);
  },

  render: function() {
    var rows = [];

    var columnNames = this.columnNames();

    var header = columnNames.map(function(c, k) {
      console.log(c);
      return (
        <th key={k}>
          {
            this.state.columns[c].name
          }
        </th>
      );
    }, this);

    // var cell = (x) => {
    //   return columnNames.map(function(c,k) {
    //     var cell;
    //
    //     return (
    //         <td>{x[c]}</td>
    //     );
    //   }, this);
    // };

    if (this.state.items) {
      this.state.items.forEach(function(item, idx){
        rows.push(
          <tr key={item.id}>
            { Cell(item) }
          </tr>
        );
      });
    }

    return this.transferPropsTo(
      <BTable responsive hover>
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </BTable>
    );
  }
});

module.exports = Table;
