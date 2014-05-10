/** @jsx React.DOM */

var React = require('react');
var GridRow = require('./GridRow');
var GridBody = React.createClass({

    render: function() {
          var rows = {};
        for (var i = 0; i < this.props.rows.length; ++i) {
            var row = this.props.rows[i];
            rows['row-' + i] = (
                  <GridRow row={row} />
            );
        }
        return (
            <tbody>
              <tr>
                {rows}
              </tr>
            </tbody>
    );
    }
});

module.exports = GridBody;
