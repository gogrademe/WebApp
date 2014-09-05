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
    typeahead: React.PropTypes.bool
    on-input: React.PropTypes.func
    on-select: React.PropTypes.func
    value: React.PropTypes.any

  get-default-props: ->
    typeahead: true

  getInitialState: ->
    last-focused-option: null
    focused-option: null
    value: @props.value
    is-open: false
    term: null

  handle-key-up: (e) ->
    e.prevent-default!

    @show-list!

    value = e.target.value

    if e.keyCode is 27
      @refs.input.getDOMNode().blur!
    else if value.length is 0
      @hide-list!
    else
      @set-state term: value

  handle-option-on-select: ->
    @refs.input.getDOMNode().value = it.props.label

    @set-state value: it.props.value

    @hide-list!

  handle-option-mouse-leave: ({index})->
    @set-state last-focused-option: index
  handle-option-mouse-enter: ({index}) ->
    # Need to handle keyboard usage here
    @set-state focused-option: index


  render-options: ->
    if @props.children
      #filtered = @filter-options @props.children
      React.Children.map @props.children, (child, index)~>
        if child.type is not Option.type then return

        props = child.props

        props.on-click = @handle-option-on-select.bind @, child
        props.on-mouse-enter = @handle-option-mouse-enter.bind @, index: index
        props.on-mouse-leave = @handle-option-mouse-leave.bind @, index: index
        return child
    else
      div null,
        "No Results..."

  show-list: ->
    @set-state is-open: true
  hide-list: ->
    @set-state is-open: false

  handle-input-blur: ->
    it.prevent-default!
    if @state.focused-option is not @state.last-focused-option
      return
    else
      @hide-list!

  make-list-style: ->
    if @state.is-open
      display: 'block'
    else
      display: 'none'

  render: ->
    @transfer-props-to do
      div null,
        input do
          ref: "input"
          class-name: "prompt"
          type: "text"
          placeholder: @props.placeholder
          onKeyUp: @handle-key-up
          onBlur: @handle-input-blur
        div ref: "list" class-name: "results" style: @make-list-style!,
          @render-options!

module.exports =
  Autocomplete: Autocomplete
  Option: Option
