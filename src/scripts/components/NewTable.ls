require! {
  React: 'react'
  #EventEmitter2.EventEmitter2
  p: 'prelude-ls'

  "../api/api.ls"
  "../utils.ls"
}

Dom = React.DOM
{div, a, i, table, thead, tr, tbody, td, th, span, input, button, pre} = Dom

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
  | val is undefined => "empty"
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
      table class-name: "ui compact striped table",
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
                td key: "cell-#rowI-#columnI" class-name: "#{column.td-class-name || " "}",
                  result

  ## Responsible for getting the renderer set
  ## for the column or the default StringRenderer.
  getRenderer: (column, rowI, columnI) ->
    renderer = column.renderer || StringRenderer

  renderHeader: (obj, index) ->
    #Col Header
    th key: "col-#index" class-name: obj.class-name,
      obj.display || obj.key

    #handler = !~>
    #  currentIndex = @state.sortByIndex
    #  @setState do
    #    sortByIndex: index,
    #    sortByDirection: (if index is currentIndex then not @state.sortByDirection else false)
    #th key: "col-#index" onClick: handler, class-name: obj.class-name,
    #  @state.sortByIndex is index and span(null, (if @state.sortByDirection then "↑ " else "↓ ")),
    #    obj.display || obj.key

#events = new EventEmitter2!
StringRenderer = React.create-class do
  displayName: "StringRenderer"
  getInitialState: ->
    editing: false

  handleChange: (event) !->
    value: event.target.value
    column: @props.column
    row: @props.row

  render: ->
    val = format-val(@props.value, @props.column.format)
    if @state.editing
      div null,
        div class-name:"ui action input small",
          input type: "text", value: val, onChange: @handleChange
          div class-name: "ui button tiny", on-click: @toggle,
            "x"
    else
      div onClick: @toggle,
        val

  toggle: !->
    #disable editing
    @setState editing: not @state.editing





CrudActions = React.create-class do
  display-name: "CrudActions"
  delete: (e)->
    e.prevent-default!
    api.[@props.column.resource-type].del @props.row.id

  render: ->
    div null,
      a class-name: "ui icon button tiny" on-click: @delete,
        i class-name: "icon trash red"
      @props.column.custom-actions? @props


CellLink = React.create-class do
  display-name: "CellLink"

  render: ->
    link-to = @props.column.link-to

    div null,
      Link to: link-to, termId: term-id, resourceId: @props.row.id,
        @props.value


module.exports =
  Grid: Grid
  CrudActions: CrudActions
  StringRenderer: StringRenderer
  CellLink: CellLink
