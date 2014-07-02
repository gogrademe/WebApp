{td, th, tr, thead, tr, tbody}= require 'react'






defaultCellRenderer = (props) ->
  props.value
"use strict"

BTable = require("react-bootstrap").Table
RRouter = require("rrouter")
RoutingContextMixin = RRouter.RoutingContextMixin
Cell = React.createClass(
  displayName: "Cell"
  getDefaultProps: ->
    renderer: defaultCellRenderer

  render: ->
    td null, @props.renderer(value: @props.value)
)
Row = React.createClass(
  displayName: "Row"
  render: ->
    children = undefined
    return
)

# Table with random data. Will change this to take in props to define data soon.
Table = React.createClass(
  displayName: "Table"
  mixins: [RoutingContextMixin]
  propTypes:
    config: React.PropTypes.object.isRequired
    linkTo: React.PropTypes.string.isRequired

  getInitialState: ->
    items: @props.initialItems or []
    
    # sort: this.props.config.sort || { column: "", order: "" },
    columns: @props.config.columns

  componentWillReceiveProps: (nextProps) ->
    
    # Load new data when the dataSource property changes.
    @loadData nextProps.dataSource  unless nextProps.dataSource is @props.dataSource
    return

  componentWillMount: ->
    @loadData @props.dataSource
    return

  loadData: (dataSource) ->
    return  unless dataSource
    @setState items: dataSource
    return

  columnNames: ->
    Object.keys @state.columns

  render: ->
    rows = []
    columnNames = @columnNames()
    header = columnNames.map((c, k) ->
      console.log c
      th
        key: k
      , @state.columns[c].name
    , this)
    
    # var cell = (x) => {
    #   return columnNames.map(function(c,k) {
    #     var cell;
    #
    #     return (
    #         <td>{x[c]}</td>
    #     );
    #   }, this);
    # };
    if @state.items
      @state.items.forEach (item, idx) ->
        rows.push tr(
          key: item.id
        , Cell(item))
        return

    @transferPropsTo BTable(
      responsive: true
      hover: true
    , thead(null, tr(null, header)), tbody(null, rows))
)
module.exports = Table