/** @jsx React.DOM */

var React = require('react');
var GridRow = React.createClass({

    render: function() {
      var keys = Object.keys(this.props.row)
          var cells = {};
        for (var i = 0; i < keys.length; ++i) {
            cells['cell-' + i] = (
                  <td>
                    {this.props.row[keys[i]]}
                  </td>
            );
        }
        return (
              <tr>
                {cells}
              </tr>
    );
    }
});

module.exports = GridRow;

