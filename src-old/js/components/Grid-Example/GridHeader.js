/** @jsx React.DOM */

var React = require('react');
var GridHeader = React.createClass({
    render: function() {
      var cols = {};

      for (var i = 0; i < this.props.columns.length; ++i) {
            var column = this.props.columns[i];
            cols['col-' + i] = (
                  <td col="0" className="w2ui-head" style={{width: column.width}}>
                    <div className="w2ui-resizer" name="0" style={{height: 25, 'margin-left': 46}}></div>
                    <div>{column.title}</div>
                  </td>
            );
        }
        return (
          <div id="gridgridcolumns" className="w2ui-grid-columns">
            <table>
              <tbody>
                {cols}
              </tbody>
            </table>
          </div>
        )
    }

});

module.exports = GridHeader;