require! {
  React
  EventEmitter2.EventEmitter2
  p: 'prelude-ls'
  "../utils.ls"
}

Dom = React.DOM
{div, table, thead, tr, tbody, td, th, span, input, button, pre} = Dom

## Get a nested key.
get = (obj, prop) ->
  parts = prop.split('.')
  last = parts.pop!

  while prop = parts.shift!
    obj = obj[prop]
    return if typeof obj isnt 'object' or not obj
  obj[last]

format-val = (val, format) ->
  if typeof format is 'function'
    return format(val)

  switch format
  | 'date'           => utils.formatDate(val)
  | 'decimalPercent' => "#{val * 100}%"
  | otherwise        => val

Grid = React.create-class do
  displayName: "Grid"

  getInitialState: ->
    sortByIndex: null
    sortDirection: true

  render: ->
    data = @props.data
    cols = @props.columns
    getRenderer = @getRenderer

    @transfer-props-to do
      table class-name: "ui table",
        thead null,
          tr null,
            cols.map(@renderHeader)
        tbody null,
          ## Build Rows
          data.map (row, rowI) ->
            ## Table Row
            tr key: "row-#rowI",
              ## Build columns
              cols.map (column, columnI) ->
                result = getRenderer(column, rowI, columnI) do
                  rowI: rowI
                  row: row
                  columnI: columnI
                  column: column
                  value: get row, column.key || ""
                ## Row Cell
                td key: "cell-#rowI-#columnI",
                  result

  ## Responsible for getting the renderer set
  ## for the column or the default StringRenderer.
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
    val = format-val(@props.value, @props.column.format)

    if @state.editing
      div null,
        input value: val onChange: @handleChange
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
