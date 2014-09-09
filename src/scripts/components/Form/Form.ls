require! {
  React: 'react'
}
Dom = React.DOM
{div, label, input} = Dom

Form = React.create-class do
  prop-types:
    for: React.PropTypes.string.isRequired
    data: React.PropTypes.object

  get-default-props: ->
    for: ""
    data: []

  handle-save: ->

  render: ->
    form class-name: "#{@props.class-name} field"
      @props.children

module.exports =
  Form: Form
