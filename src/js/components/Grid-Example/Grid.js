/** @jsx React.DOM */

var React = require('react');
var GridBody = require('./GridBody');
var GridToolbar = require('./GridToolbar');
var GridHeader = require('./GridHeader');
var Grid = React.createClass({
    getDefaultState: function(props) {
        var recordHeight = 25;
        var recordsPerBody = Math.floor((props.height - 2) / recordHeight);
        return {
            total: props.records.length,
            records: props.records,
            recordHeight: recordHeight,
            recordsPerBody: recordsPerBody,
            visibleStart: 0,
            visibleEnd: recordsPerBody,
            displayStart: 0,
            displayEnd: recordsPerBody * 2,
            columns: [{
              title: "ID",
              width: 50
            },{
              title: "First Name",
              width: 150
            },{
              title: "Last Name",
              width: 150
            },{
              title: "Email Address",
              width: 150
            }],
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this.getDefaultState(nextProps));
        this.scrollState(this.state.scroll);
    },

    getInitialState: function() {
        return this.getDefaultState(this.props);
    },

    scrollState: function(scroll) {
        var visibleStart = Math.floor(scroll / this.state.recordHeight);
        var visibleEnd = Math.min(visibleStart + this.state.recordsPerBody, this.state.total - 1);

        var displayStart = Math.max(0, Math.floor(scroll / this.state.recordHeight) - this.state.recordsPerBody * 1.5);
        var displayEnd = Math.min(displayStart + 4 * this.state.recordsPerBody, this.state.total - 1);

        this.setState({
            visibleStart: visibleStart,
            visibleEnd: visibleEnd,
            displayStart: displayStart,
            displayEnd: displayEnd,
            scroll: scroll
        });
    },

    onScroll: function(event) {
        this.scrollState(this.refs.scrollable.getDOMNode().scrollTop);
    },

    formatNumber: function(number) {
        return (''+number).split('').reverse().join('').replace(/(...)/g, '$1,').split('').reverse().join('').replace(/^,/, '');
    },

    getCount: function() {
        return (1 + this.formatNumber(this.state.visibleStart)) +
         '-' + (1 + this.formatNumber(this.state.visibleEnd)) +
         ' of ' + this.formatNumber(this.state.total);
    },

    render: function() {
        return (

    <div id="grid" style={{width: 600, height: 568}} name="grid" className="w2ui-reset w2ui-grid">
      <div style={{width: 598, height: 566}}>
        <div id="gridgridheader" className="w2ui-grid-header" style={{display: 'none'}}></div>
        <GridToolbar />
        <div id="gridgridbody" className="w2ui-grid-body" style={{top: 38, bottom: 24, left: 0, right: 0, height: 504}}>
          <GridHeader columns={this.state.columns}/>

          <div id="gridgridrecords" className="w2ui-grid-records" style={{top: 26, 'overflow-x': 'hidden', 'overflow-y': 'auto'}} ref="scrollable" onScroll={this.onScroll}>
              <GridBody
                  columns={this.state.columns}
                  records={this.state.records}
                  total={this.state.records.length}
                  visibleStart={this.state.visibleStart}
                  visibleEnd={this.state.visibleEnd}
                  displayStart={this.state.displayStart}
                  displayEnd={this.state.displayEnd}
                  recordHeight={this.state.recordHeight}
              />
          </div>

        </div>
        <div id="gridgridsummary" className="w2ui-grid-body w2ui-grid-summary" style={{display: 'none'}}></div>
        <div id="gridgridfooter" className="w2ui-grid-footer" style={{bottom: 0, left: 0, right: 0}}>
          <div>
            <div className="w2ui-footer-left"></div>
            <div className="w2ui-footer-right">{this.getCount()}</div>
            <div className="w2ui-footer-center"></div>
          </div>
        </div>
      </div>
    </div>
    );
    }
});

module.exports = Grid;
