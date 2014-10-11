require! {
  'react': React

  '../api/api.ls'
}

{filter, sort-by} = require 'prelude-ls'

escapeRegExp = (str) ->
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

Dom = React.DOM
{div, h1, img, span, ul, a, i, button, input, p, strong} = Dom

Result = React.create-class do
  highlight: (text, query) ->
    regex = new RegExp(escapeRegExp(query), 'gi')
    things = []
    text.split(regex).for-each (x, i) ->
      things.push span {key: i * 2}, x
      things.push strong {key: i * 2 + 1}, query
    things.slice(0, -1)

  render: ->
    @transfer-props-to do
      div class-name:"result",
        div class-name: "info",
          div class-name: "title",
            @highlight @props.name, @props.query

Results = React.create-class do
  callSelectHandler: ->
    @props.selectHandler it

  render: ->
    shouldShow = ~>
      if @props.list.length > 0 and @props.show then
        display: 'block'
      else
        display: 'none'

    nodes = @props.list.map (item, i) ~>
      Result key: i, query: @props.query, name: "#{item.firstName} #{item.lastName}", on-mouse-down: @callSelectHandler.bind @, item

    div class-name: "results" style: shouldShow!,
      nodes

Autocomplete = React.create-class do
  # we initilize the component state with an immutable array
  getInitialState: ->
    showResults: false
    data: []
    call:
      latest:0
      term:''

  makeCall: (term, current) ->
    api.person.find!
      .then ~>
        @setState do
          showResults: true
          data: it[0]

  handleKeyUp: (e) ->
    e.prevent-default!
    k = e.target.value

    if e.keyCode is 27
      @refs.autoCompleteInput.getDOMNode().blur!
    else if k.length is 0
      @hideResults!
    else
      @set-state do
        call:
          term: k
      @makeCall!

  hideResults: (e) ->
    @setState showResults: false

  handleOnSelect: ->
    @refs.autoCompleteInput.getDOMNode().value = "#{it.firstName} #{it.lastName}"

    @props.item-selected it

  filterData: ->
    includes = (str, needle) ->
      return true if needle is ""
      return false unless str?
      String(str.to-lower-case!).indexOf(needle.to-lower-case!) isnt -1

    @state.data
      |> filter (~> it.firstName `includes` @state.call.term),
      |> sort-by (.firstName)

  render: ->
    if (@state.call.latest > 0 && @state.call.term != '')
      @makeCall @state.call.term, @state.call.latest

    @transfer-props-to do
      div null,
        input do
          ref: "autoCompleteInput"
          class-name: "prompt"
          type: "text"
          placeholder: @props.placeholder
          onKeyUp: @handleKeyUp
          onBlur: @hideResults
        Results list: @filterData!, show: @state.showResults, query: @state.call.term, select-handler: @handleOnSelect


module.exports = Autocomplete
