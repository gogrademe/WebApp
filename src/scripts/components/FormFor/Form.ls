require! {
  'react': React
  '../../api/api.ls'

  './Input.ls': FormInput
}
Dom = React.DOM
{div, a, form, button} = Dom

Form = React.create-class do
  display-name: "Form"
  prop-types:
    on-cancel: React.PropTypes.func
    on-success: React.PropTypes.func
    actions: React.PropTypes.bool
    resource: React.PropTypes.string.isRequired
    method: React.PropTypes.string.isRequired
    data: React.PropTypes.any

  get-default-props: ->
    on-cancel: -> {}
    actions: true
    data: {}

  get-initial-state: ->
    data: @props.data

  handle-submit: (e)->
    e.prevent-default!

    api[@props.resource][@props.method] @state.data
      .then ~>
        @props.on-success
      .catch ~>
        console.log "OOPS", it

  render-actions: ->
    if @props.actions
      div class-name:"actions",
        a class-name: "ui button" on-click: @props.on-cancel,
          "Cancel"
        button class-name: "ui button primary" type: "submit",
          "Save"

  handle-field-on-change: ({key, value}) ->
    @state.data[key] = value
    @set-state data: @state.data

  render-children: ->
    React.Children.map @props.children, (child, index)~>
      if child.type is not FormInput.type then return child

      child.props.on-change = @handle-field-on-change

      return child

  render: ->
    @transfer-props-to do
      form class-name: "ui form", on-submit: @handle-submit,
        @render-children!
        @render-actions!



module.exports = Form
