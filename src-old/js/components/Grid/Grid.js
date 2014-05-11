/** @jsx React.DOM */

var React = require('react');

var utils = require('../../utils');
var GridHeader = require('./GridHeader');
var GridBody = require('./GridBody');
var Grid = React.createClass({
    getDefaultState: function(props) {
        return {
            total: props.data.length,
            data: props.data,
            columns: props.columns
        };
    },
    getInitialState: function() {
        return this.getDefaultState(this.props);
    },
    getRows: function() {
      var rowDataCol = [];

      utils.forEach(this.state.columns, function(val){
        console.log(val);
        rowDataCol.push(utils.camelCase(val.title));
      });
      var rows = [];
      for (var i = 0; i < this.state.data.length; ++i) {
        rows.push(utils.pick(this.state.data[i], rowDataCol));
      };
      return rows;
    },

    render: function() {
        return (
          <div className="table-scroll-wrapper">
          <div className="table-scroll">
        <table className="table table-hover table-striped table-responsive ">
            <GridHeader columns={this.state.columns} />
            <GridBody rows={this.getRows()} />
          </table>
          </div>
          </div>

    );
    }
});

module.exports = Grid;
