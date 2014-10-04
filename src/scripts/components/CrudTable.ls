require! {
  React: 'react'

  './NewTable.ls'
  './SemanticModal.ls'
  './PageHeader.ls'

  "../api/api.ls"
}
Dom = React.DOM
{div, i, strong, a} = Dom

{Grid} = NewTable

Module = React.create-class do
  displayName: "Module"
  prop-types:
    title: React.PropTypes.string
    resources: React.PropTypes.array.is-required
    columns: React.PropTypes.object.is-required

  get-default-props: ->
    columns: []
    data: []


  render: ->
    div null,
      if @props.title
        PageHeader primary: @props.title
      div class-name: "main container",
        div class-name: "ui top attached right aligned segment",
          #SemanticModal.ModalTrigger modal: CreateClassModal!,
          a class-name: "ui primary tiny button", "New"
        Grid class-name: "bottom attached" columns: @props.columns, data: @props.data

module.exports = Module
