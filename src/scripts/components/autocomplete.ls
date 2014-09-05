require! {
  React: 'react'


  'react/lib/cloneWithProps'

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


Option = React.create-class do
  display-name: "AutocompleteOption"
  prop-types:
    value: React.PropTypes.any.isRequired
    label: React.PropTypes.string.isRequired

  get-default-props: ->
    role: 'option'
    tab-index: '-1'
    is-selected: false

  render: ->
    @transfer-props-to do
      div class-name:"result",
        div class-name: "info",
          div class-name: "title",
            @props.children || @props.label


Autocomplete = React.create-class do
  display-name: "Autocomplete"

  prop-types:
    on-input: React.PropTypes.func
    on-select: React.PropTypes.func
    value: React.PropTypes.any

  getInitialState: ->
    focused-index: null
    value: @props.value
    is-open: false
    term: null

  handleKeyUp: (e) ->
    e.prevent-default!

    @show-list!

    k = e.target.value

    if e.keyCode is 27
      @refs.input.getDOMNode().blur!
    else if k.length is 0
      @hide-list!
    else
      @set-state term: k


  focus-option: ->
    index = @state.focused-index
    /*console.log @refs.list.getDOMNode!.child-nodes[index]
    @refs.list.getDOMNode!.child-nodes[index].focus!*/
    #this.refs.list.getDOMNode().childNodes[index].focus();

  focus-option-at-index: ({index})->
    @set-state focused-index: index

    @focus-option!

  handle-on-select: ->
    console.log it
    @refs.input.getDOMNode().value = it.props.label

    @set-state value: it.props.value
    /*@props.item-selected it*/

  handle-mouse-enter: ({index}) ->
    # Need to handle keyboard usage here
    @focus-option-at-index index: index

  /*filterData: ->
    includes = (str, needle) ->
      return true if needle is ""
      return false unless str?
      String(str.to-lower-case!).indexOf(needle.to-lower-case!) isnt -1

    @state.data
      |> filter (~> it.firstName `includes` @state.call.term),
      |> sort-by (.firstName)*/

  /*filter-options: (options) ->
    includes = (str, needle) ->
      return true if needle is ""
      return false unless str?
      String(str.to-lower-case!).indexOf(needle.to-lower-case!) isnt -1

    options
      |> console.log*/
      #|> filter (~> it.props.label `includes` @state.term)


  render-options: ->
    if @props.children
      #filtered = @filter-options @props.children
      React.Children.map @props.children, (child, index)~>
        if child.type is not Option.type then return

        props = child.props

        #props.onBlur = this.handleOptionBlur;
        #props.onClick = this.selectOption.bind(this, child);
        #props.onFocus = this.handleOptionFocus;
        #props.onKeyDown = this.handleOptionKeyDown.bind(this, child);
        #props.onMouseEnter = this.handleOptionMouseEnter.bind(this, index);

        props.on-click = @handle-on-select.bind @, child
        props.on-mouse-enter = @handle-mouse-enter.bind @, index: index
        return child
    else
      div null,
        "No Results..."

  show-results: ->
    if @state.is-open
      display: 'block'
    else
      display: 'none'

    /*if @props.children > 0
      display: 'block'
    else
      display: 'none'*/
  show-list: ->
    @set-state is-open: true
  hide-list: ->
    @set-state is-open: false

  handle-input-blur: ->
    focusedAnOption = @state.focused-index != null
    if focusedAnOption
      return

    @hide-list

  render: ->
    @transfer-props-to do
      div null,
        input do
          ref: "input"
          class-name: "prompt"
          type: "text"
          placeholder: @props.placeholder
          onKeyUp: @handleKeyUp
          onBlur: @handle-input-blur
        div ref: "list" class-name: "results" style: @show-results!,
          @render-options!

        #Results list: @filterData!, show: @state.showResults, query: @state.call.term, select-handler: @handle-on-select


module.exports =
  Autocomplete: Autocomplete
  Option: Option
