/** @jsx React.DOM */

var React = require('react');
var GridHeader = React.createClass({

    render: function() {
          var cols = {};
        for (var i = 0; i < this.props.columns.length; ++i) {
            var column = this.props.columns[i];
            cols['col-' + i] = (
                  <th>
                    <span className="title">{column.title}</span>
                  </th>
            );
        }
        return (
            <thead>
              <tr>
                {cols}
              </tr>
            </thead>
    );
    }
});

module.exports = GridHeader;