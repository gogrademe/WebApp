/** @jsx React.DOM */

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
        var rows = {};

        rows.top = (
            <tr id="gridgridrectop" line="top" style={{height: this.props.displayStart * this.props.recordHeight}}>
                <td colspan="200"></td>
            </tr>
        );

        for (var i = this.props.displayStart; i < this.props.displayEnd; ++i) {
            var record = this.props.records[i];
            rows['line' + i] = (
                <tr class={i % 2 === 0 ? 'w2ui-even' : 'w2ui-odd'} style={{height: this.props.recordHeight}}>
                    <td class="w2ui-grid-data" col="0">
                        <div title={i + 1}>{i + 1}</div>
                    </td>
                    <td class="w2ui-grid-data" col="1">
                        <div title={record.fname}>{record.fname}</div>
                    </td>
                    <td class="w2ui-grid-data" col="2">
                        <div title={record.lname}>{record.lname}</div>
                    </td>
                    <td class="w2ui-grid-data" col="3">
                        <div title={record.email}>{record.email}</div>
                    </td>
                    <td class="w2ui-grid-data-last"></td>
                </tr>
            );
        }
        rows.bottom = (
            <tr id="gridgridrecbottom" line="bottom" style={{height: (this.props.records.length - this.props.displayEnd) * this.props.recordHeight}}>
                <td colspan="200"></td>
            </tr>
        );

        return (
            <table>
              <tbody>
                <tr line="0">
                  <td class="w2ui-grid-data" col="0" style={{height: 0, width: 50}}></td>
                  <td class="w2ui-grid-data" col="1" style={{height: 0, width: 150}}></td>
                  <td class="w2ui-grid-data" col="2" style={{height: 0, width: 150}}></td>
                  <td class="w2ui-grid-data" col="3" style={{height: 0, width: 150}}></td>
                  <td class="w2ui-grid-data-last" style={{height: 0, width: 81}}></td>
                </tr>
                {rows}
              </tbody>
            </table>
        );
    }
});

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
            displayEnd: recordsPerBody * 2
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this.getDefaultState(nextProps));
        this.scrollState(this.state.scroll);
    },

    getInitialState: function() {
        return this.getDefaultState(this.props);
    },

    scrollState: React.autoBind(function(scroll) {
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
    }),

    onScroll: React.autoBind(function(event) {
        this.scrollState(this.refs.scrollable.getDOMNode().scrollTop);
    }),

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
    <div id="grid" style={{width: 600, height: 568}} name="grid" class="w2ui-reset w2ui-grid">
      <div style={{width: 598, height: 566}}>
        <div id="gridgridheader" class="w2ui-grid-header" style={{display: 'none'}}></div>
        <GridToolbar />
        <div id="gridgridbody" class="w2ui-grid-body" style={{top: 38, bottom: 24, left: 0, right: 0, height: 504}}>
          <div id="gridgridrecords" class="w2ui-grid-records" style={{top: 26, 'overflow-x': 'hidden', 'overflow-y': 'auto'}} ref="scrollable" onScroll={this.onScroll}>
              <GridBody
                  records={this.state.records}
                  total={this.state.records.length}
                  visibleStart={this.state.visibleStart}
                  visibleEnd={this.state.visibleEnd}
                  displayStart={this.state.displayStart}
                  displayEnd={this.state.displayEnd}
                  recordHeight={this.state.recordHeight}
              />
          </div>
          <div id="gridgridcolumns" class="w2ui-grid-columns">
            <table>
              <tbody>
                <tr>
                  <td col="0" class="w2ui-head" style={{width: 50}}>
                    <div class="w2ui-resizer" name="0" style={{height: 25, 'margin-left': 46}}></div>
                    <div>ID</div>
                  </td>
                  <td col="1" class="w2ui-head" style={{width: 150}}>
                    <div class="w2ui-resizer" name="1" style={{height: 25, 'margin-left': 146}}></div>
                    <div>First Name</div>
                  </td>
                  <td col="2" class="w2ui-head" style={{width: 150}}>
                    <div class="w2ui-resizer" name="2" style={{height: 25, 'margin-left': 146}}></div>
                    <div>Last Name</div>
                  </td>
                  <td col="3" class="w2ui-head" style={{width: 150}}>
                    <div class="w2ui-resizer" name="3" style={{height: 25, 'margin-left': 146}}></div>
                    <div>Email</div>
                  </td>
                  <td class="w2ui-head w2ui-head-last" style={{width: 98}}>
                    <div>{String.fromCharCode(160)}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="gridgridsummary" class="w2ui-grid-body w2ui-grid-summary" style={{display: 'none'}}></div>
        <div id="gridgridfooter" class="w2ui-grid-footer" style={{bottom: 0, left: 0, right: 0}}>
          <div>
            <div class="w2ui-footer-left"></div>
            <div class="w2ui-footer-right">{this.getCount()}</div>
            <div class="w2ui-footer-center"></div>
          </div>
        </div>
      </div>
    </div>
    );
    }
});

var GridToolbar = React.createClass({
    shouldUpdateComponent: function() {
        return false;
    },

    render: function() {
        return (
        <div id="gridgridtoolbar" class="w2ui-grid-toolbar w2ui-reset w2ui-toolbar" name="gridtoolbar" style={{top: 0, left: 0, right: 0}}>
          <table cellspacing="0" cellpadding="0" width="100%">
            <tbody>
              <tr>
                <td id="tbgridtoolbaritemreload" valign="middle">
                  <table cellpadding="0" cellspacing="0" title="Reload data in the list" class="w2ui-button">
                    <tbody>
                      <tr>
                        <td>
                          <table cellpadding="1" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div class="w2ui-tb-image w2ui-icon icon-reload"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td id="tbgridtoolbaritemcolumn-on-off" valign="middle">
                  <table cellpadding="0" cellspacing="0" title="Show/hide columns" class="w2ui-button">
                    <tbody>
                      <tr>
                        <td>
                          <table cellpadding="1" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div class="w2ui-tb-image w2ui-icon icon-columns"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td id="tbgridtoolbaritembreak0" valign="middle">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <div class="w2ui-break">{String.fromCharCode(160)}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td id="tbgridtoolbaritemsearch" valign="middle">
                  <table cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td nowrap="nowrap">
                          <table cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div class="w2ui-icon icon-search-down w2ui-search-down" title="Select Search Field"></div>
                                </td>
                                <td>
                                  <input id="gridgridsearchall" class="w2ui-search-all" placeholder="All Fields" />
                                </td>
                                <td>
                                  <div title="Clear Search" class="w2ui-search-clear" id="gridgridsearchClear" style={{display: 'none'}}>{String.fromCharCode(160)}{String.fromCharCode(160)}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td id="tbgridtoolbaritemsearch-advanced" valign="middle">
                  <table cellpadding="0" cellspacing="0" title="Open Search Fields" class="w2ui-button">
                    <tbody>
                      <tr>
                        <td>
                          <table cellpadding="1" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>{String.fromCharCode(160)}</td>
                                <td class="w2ui-tb-caption" nowrap="nowrap">Search...</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="100%" id="tbgridtoolbarright" align="right"></td>
              </tr>
            </tbody>
          </table>
        </div>
        );
    }
});



window.generate = function generate(count) {    // generate
    var fname = ['Vitali', '~Katsia', 'John', 'Peter', '#Sue', '$Olivia', '<Thomas', '>Sergei', 'Snehal', 'Avinash', 'Divia'];
    var lname = ['Peterson', 'Rene', 'Johnson-Petrov-Sannikov-Ivanov-Smirnov', 'Cuban', 'Twist', 'Sidorov', 'Vasiliev', 'Yadav', 'Vaishnav'];
    // add records
    var records = [];
    for (var i = 0; i < count * 1000; i++) {
        records.push({
            recid : i+1,
            personid: i+1,
            fname: fname[Math.floor(Math.random() * fname.length)],
            lname: lname[Math.floor(Math.random() * lname.length)],
            email: 'vm@gmail.com', sdate: '1/1/2013', manager: '--'
        });
    }
    React.renderComponent(
        <Grid
            width={600}
            height={568}
            header="List of Names"
            showFooter={true}
            showToolbar={true}
            name="grid"
            records={records}
        />,
        document.getElementById('grid')
    );
}

generate(25);
