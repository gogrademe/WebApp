require! {
  React

  Header: "../../components/Header.ls"
  Link: "../../components/HighlightedLink.ls"
  ModalMixin: "../../components/ModalMixin.ls"

}

Dom = React.DOM
{div} = Dom

CreatePersonModal = React.createClass(
  displayName: "CreatePersonModal"

  render: ->
    div null
)
module.exports = CreatePersonModal
