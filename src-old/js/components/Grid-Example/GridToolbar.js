/** @jsx React.DOM */

var React = require('react');

var GridToolbar = React.createClass({
    shouldUpdateComponent: function() {
        return false;
    },

    render: function() {
        return (
        <div id="gridgridtoolbar" className="w2ui-grid-toolbar w2ui-reset w2ui-toolbar" name="gridtoolbar" style={{top: 0, left: 0, right: 0}}>
          <table cellSpacing="0" cellPadding="0" width="100%">
            <tbody>
              <tr>
                <td id="tbgridtoolbaritemreload" valign="middle">
                  <table cellPadding="0" cellSpacing="0" title="Reload data in the list" className="w2ui-button">
                    <tbody>
                      <tr>
                        <td>
                          <table cellPadding="1" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="w2ui-tb-image w2ui-icon icon-reload"></div>
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
                  <table cellPadding="0" cellSpacing="0" title="Show/hide columns" className="w2ui-button">
                    <tbody>
                      <tr>
                        <td>
                          <table cellPadding="1" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="w2ui-tb-image w2ui-icon icon-columns"></div>
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
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <div className="w2ui-break">{String.fromCharCode(160)}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td id="tbgridtoolbaritemsearch" valign="middle">
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td nowrap="nowrap">
                          <table cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="w2ui-icon icon-search-down w2ui-search-down" title="Select Search Field"></div>
                                </td>
                                <td>
                                  <input id="gridgridsearchall" className="w2ui-search-all" placeholder="All Fields" />
                                </td>
                                <td>
                                  <div title="Clear Search" className="w2ui-search-clear" id="gridgridsearchClear" style={{display: 'none'}}>{String.fromCharCode(160)}{String.fromCharCode(160)}</div>
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
                  <table cellPadding="0" cellSpacing="0" title="Open Search Fields" className="w2ui-button">
                    <tbody>
                      <tr>
                        <td>
                          <table cellPadding="1" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>{String.fromCharCode(160)}</td>
                                <td className="w2ui-tb-caption" nowrap="nowrap">Search...</td>
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

module.exports = GridToolbar;