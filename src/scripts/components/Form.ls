require! {
  React: 'react'
}
Dom = React.DOM
{div, label, input} = Dom

/*
module.exports = make-input-props: (key, extras={}) -> {value: @state[key], on-change: ({target}) ~> @set-state {"#key": target.value}} <<< extra
input @make-input-props 'x' {placeholder: 'X...'}*/


Input = React.create-class do
  prop-types:
    type: React.PropTypes.string.isRequired
  get-default-props: ->
    label: ""
    placeholder: ""

  call-change: (e)->
    @props.on-change e.target.value

  render: ->
    placeholder = @props.placeholder || @props.label
    div class-name: "field",
      label null, @props.label if @props.label
      input do
        placeholder: placeholder
        type: @props.type
        on-change: @call-change
        value: @props.value
        on-blur: @props.on-blur

module.exports =
  Input: Input
