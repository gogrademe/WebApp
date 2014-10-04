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
    dropdown: React.PropTypes.bool
    typeahead: React.PropTypes.bool
    on-input: React.PropTypes.func
    on-select: React.PropTypes.func
    value: React.PropTypes.any

  get-default-props: ->
    typeahead: true
    dropdown: false
    on-input: -> {}
    on-select: -> {}

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

    @props.on-select it.props.value

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

  handle-input-focus: (e)->
    e.prevent-default!
    if @props.dropdown
      @show-list!

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

  toggle-list: ->
    if @state.is-open then @hide-list! else @show-list!

  render-input: ->
    input do
      ref: "input"
      class-name: "prompt"
      type: "text"
      placeholder: @props.placeholder
      onKeyUp: @handle-key-up
      on-focus: @handle-input-focus
      onBlur: @handle-input-blur

  render: ->
    @transfer-props-to do
      div class-name: "ui search",
        if @props.dropdown then
          div class-name:"ui icon input",
            @render-input!
            i class-name: "sort ascending icon" on-click: @toggle-list
        else
          @render-input!
        div ref: "list" class-name: "results" style: @make-list-style!,
          @render-options!

module.exports =
  Autocomplete: Autocomplete
  Option: Option
