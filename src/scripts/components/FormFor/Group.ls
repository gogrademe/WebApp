require! {
  'react': React
}
Dom = React.DOM
{div, label, input} = Dom

Input = React.create-class do
  display-name: "Input"
  prop-types:
    label: React.PropTypes.string
    fields: React.PropTypes.string

  render: ->
    div class-name: "field",
      if @props.label
        label null, @props.label
      div class-name: "#{@props.fields} fields",
        @props.children

module.exports = Input
