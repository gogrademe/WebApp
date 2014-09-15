require! {
  React: 'react'
}
Dom = React.DOM
{div, label, input} = Dom

Input = React.create-class do
  display-name: "Input"
  prop-types:
    label: React.PropTypes.string
    placeholder: React.PropTypes.string
    on-change: React.PropTypes.func
    obj-id: React.PropTypes.string.isRequired
    type: React.PropTypes.string

  get-default-props: ->
    type: "text"
    placeholder: ""

  call-change: (e)->
    e.prevent-default
    @props.on-change key: @props.obj-id, value: e.target.value

  get-inputDOM-Node: ->
    @refs.input.getDOM-Node!

  render: ->
    class-name = @props.class-name || ""
    if @props.type is "date"
      class-name = class-name + " date"

    placeholder = @props.placeholder || @props.label
    div class-name: "#{class-name} field",
      if @props.label
        label null, @props.label
      input do
        ref: "input"
        placeholder: placeholder
        type: @props.type
        on-change: @call-change
        value: @props.value
        on-blur: @props.on-blur

module.exports = Input
