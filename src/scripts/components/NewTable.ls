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
Grid = React.createClass(
  displayName: "Grid"
  getInitialState: ->
    sortByIndex: null
    sortDirection: true

  render: ->
    data = @props.data
    getRenderer = @getRenderer
    table className: "table",
      thead null,
        tr null,
          @props.headers.map(@renderHeader)
      tbody null,
        data.map (row, rowI) ->
          tr null,
            row.map (column, columnI) ->
              result = getRenderer(column, rowI, columnI) do
                row: rowI
                column: columnI
                value: column

              td null, result

  getRenderer: (item, rowI, columnI) ->
    renderers = @props.renderers
    renderer = undefined
    i = 0

    while i < renderers.length
      return renderer  if renderer = renderers[i](item, rowI, columnI)
      i++
    throw new Error("No renderer for " + item + " at r" + rowI + " c" + columnI)return

  renderHeader: (text, index) ->
    handler = !~>
      currentIndex = @state.sortByIndex
      @setState sortByIndex: index, sortByDirection: (if index is currentIndex then not @state.sortByDirection else false)

    th onClick: handler,
      @state.sortByIndex is index and span(null, (if @state.sortByDirection then "↑ " else "↓ ")), text
)
events = new EventEmitter2!
StringRenderer = React.createClass(
  displayName: "StringRenderer"
  getInitialState: ->
    editing: false

  handleChange: (event) ->
    events.emit "change",
      value: event.target.value
      column: @props.column
      row: @props.row

    return

  render: ->
    if @state.editing
      div null, input(
        value: @props.value
        onChange: @handleChange
      ), button(
        onClick: @toggle
      , "x")
    else
      div onClick: @toggle,
        @props.value

  toggle: ->
    @setState editing: not @state.editing
    return
)

module.exports =
  Grid: Grid
  StringRenderer: StringRenderer
  bindId: bindId
