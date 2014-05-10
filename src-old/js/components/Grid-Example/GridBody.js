/** @jsx React.DOM */

var React = require('react');
var GridBody = React.createClass({
    getInitialState: function() {
        return {
            shouldUpdate: true,
            total: 0,
            displayStart: 0,
            displayEnd: 0
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var shouldUpdate = !(
            nextProps.visibleStart >= this.state.displayStart &&
            nextProps.visibleEnd <= this.state.displayEnd
        ) || (nextProps.total !== this.state.total);

        if (shouldUpdate) {
            this.setState({
                shouldUpdate: shouldUpdate,
                total: nextProps.total,
                displayStart: nextProps.displayStart,
                displayEnd: nextProps.displayEnd
            });
        } else {
            this.setState({shouldUpdate: false});
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.shouldUpdate;
    },

    render: function() {

        var cells = {};
        var rows = {};

        for (var i = 0; i < this.props.columns.length; ++i) {
            cells['cell-' + i] = (

                )
        }

        rows.top = (
            <tr id="gridgridrectop" line="top" style={{height: this.props.displayStart * this.props.recordHeight}}>
                <td colSpan="200"></td>
            </tr>
        );

        for (var i = this.props.displayStart; i < this.props.displayEnd; ++i) {
            var record = this.props.records[i];
            rows['line' + i] = (
                <tr className={i % 2 === 0 ? 'w2ui-even' : 'w2ui-odd'} style={{height: this.props.recordHeight}}>
                    <td className="w2ui-grid-data" col="0">
                        <div title={i + 1}>{i + 1}</div>
                    </td>
                    <td className="w2ui-grid-data" col="1">
                        <div title={record.fname}>{record.fname}</div>
                    </td>
                    <td className="w2ui-grid-data" col="2">
                        <div title={record.lname}>{record.lname}</div>
                    </td>
                    <td className="w2ui-grid-data" col="3">
                        <div title={record.email}>{record.email}</div>
                    </td>
                    <td className="w2ui-grid-data-last"></td>
                </tr>
            );
        }
        rows.bottom = (
            <tr id="gridgridrecbottom" line="bottom" style={{height: (this.props.records.length - this.props.displayEnd) * this.props.recordHeight}}>
                <td colSpan="200"></td>
            </tr>
        );

        return (
            <table>
              <tbody>
                <tr line="0">
                  <td className="w2ui-grid-data" col="0" style={{height: 0, width: 50}}></td>
                  <td className="w2ui-grid-data" col="1" style={{height: 0, width: 150}}></td>
                  <td className="w2ui-grid-data" col="2" style={{height: 0, width: 150}}></td>
                  <td className="w2ui-grid-data" col="3" style={{height: 0, width: 150}}></td>
                  <td className="w2ui-grid-data-last" style={{height: 0, width: 81}}></td>
                </tr>
                {rows}
              </tbody>
            </table>
        );
    }
});

module.exports = GridBody;