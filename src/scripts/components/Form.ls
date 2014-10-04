require! {
  React: 'react'
}
Dom = React.DOM
{div, label, input, form, button, i, a} = Dom

Input = React.create-class do
  prop-types:
    type: React.PropTypes.string.isRequired

  get-default-props: ->
    label: ""
    placeholder: ""

  call-change: (e)->
    @props.on-change e.target.value

  get-inputDOM-Node: ->
    @refs.input.getDOM-Node!

  render: ->
    placeholder = @props.placeholder || @props.label
    div class-name: "#{@props.class-name} field",
      label null, @props.label if @props.label
      input do
        ref: "input"
        placeholder: placeholder
        type: @props.type
        on-change: @call-change
        value: @props.value
        on-blur: @props.on-blur

Form = React.create-class do
  display-name: "Form"
  prop-types:
    is-modal: React.PropTypes.bool
    on-submit: React.PropTypes.func.isRequired
    on-cancel: React.PropTypes.func.isRequired

  get-default-props: ->
    submit-button: "Save"
    cancel-button: "Cancel"

  handle-cancel-click: (e) ->
    e.prevent-default!

  handle-submit: (e) ->
    e.prevent-default!

  render: ->
    div class-name: "content",
      form class-name: "ui form" on-submit: @handle-submit,
        @props.children
      div class-name: "actions",
        a class-name: "ui labeled icon button" on-click: @handle-cancel-click,
          i class-name: "cancel icon"
          @props.cancel-button
        button class-name: "ui primary submit labeled icon button" type: "submit",
          i class-name: "save icon"
          @props.submit-button

module.exports =
  Form: Form
  Input: Input
