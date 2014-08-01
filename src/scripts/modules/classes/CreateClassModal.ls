require! {
  React: 'react'
  Header: "../../components/Header.ls"
  Link: "../../components/HighlightedLink.ls"
  ModalMixin: "../../components/ModalMixin.ls"

}

Dom = React.DOM
{div, button} = Dom

ClassAssignments = React.create-class do
  displayName: "ClassAssignments"
  saveChanges: !->
    @props.flux.actions.addClass!

  render: ->
    @transferPropsTo do
      Modal title: "Create Class" animation: true,
        div className: "modal-footer",
          button bsStyle: "danger" onClick: @props.onRequestHide,
            "Cancel"
          button bsStyle: "primary" onClick: @saveChanges,
            "Save changes"

module.exports = ClassAssignments
