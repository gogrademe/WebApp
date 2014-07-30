require! {
  React

  "../../components/Panel.ls"

  "../../api/api.ls"

  Nav: './nav.ls'
  Header: '../../components/Header.ls'
}
Dom = React.DOM
{div} = Dom

ClassDetail = React.create-class do
  displayName: "ClassDetail"
  get-initial-state: ->
    terms: []

  render: ->
    div null,
      Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      div null,
        "Maybe put grades here?"

module.exports = ClassDetail
