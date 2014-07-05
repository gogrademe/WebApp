require! {
  React
  EventEmitter2.EventEmitter2
}

Dom = React.DOM
{div, table, thead, tr, tbody, td, th, span, input, button, pre} = Dom

# flip direction if selected, otherwise set to false
bindId = (x) ->
  ->
    x

Grid = React.create-class do
  displayName: "Grid"
  getInitialState: ->
    sortByIndex: null
    sortDirection: true

  render: ->
    data = @props.data
    cols = @props.columns
    getRenderer = @getRenderer
    div class-name: "table-responsive",
      table class-name: "table",
        thead null,
          tr null,
            cols.map(@renderHeader)
        tbody null,
          data.map (row, rowI) ->
            # Table Row
            tr key: "row-#rowI",
              cols.map (column, columnI) ->
                result = getRenderer(column, rowI, columnI) do
                  rowI: rowI
                  row: row
                  columnI: columnI
                  column: column
                  value: row[column.key] || ""
                # Row Cell
                td key: "cell-#rowI-#columnI", class-name:'vert-align', result

  getRenderer: (column, rowI, columnI) ->
    renderer = column.renderer || StringRenderer

  renderHeader: (obj, index) ->
    handler = !~>
      currentIndex = @state.sortByIndex
      @setState do
        sortByIndex: index,
        sortByDirection: (if index is currentIndex then not @state.sortByDirection else false)
    #Col Header
    th key: "col-#index" onClick: handler,
      @state.sortByIndex is index and span(null, (if @state.sortByDirection then "↑ " else "↓ ")),
        obj.display || obj.key

events = new EventEmitter2!
StringRenderer = React.create-class do
  displayName: "StringRenderer"
  getInitialState: ->
    editing: false

  handleChange: (event) !->
    events.emit "change",
      value: event.target.value
      column: @props.column
      row: @props.row

  render: ->
    val = @props.value
    if @props.column.format
      val = @props.column.format(val)

    if @state.editing
      div null,
        input value: @props.value onChange: @handleChange
        button onClick: @toggle,
          "x"
    else
      div onClick: @toggle,
        val

  toggle: !->
    @setState editing: not @state.editing



module.exports =
  Grid: Grid
  StringRenderer: StringRenderer
