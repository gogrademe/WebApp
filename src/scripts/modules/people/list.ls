require! {
  React: 'react'

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreatePersonModal.ls'
  './CreateAccountModal.ls'

  Header: '../../components/PageHeader.ls'

  '../../components/SemanticModal.ls'
}
Dom = React.DOM
{div, h3, span, a} = Dom

{Grid, StringRenderer} = NewTable

custom-actions = (props)->
  SemanticModal.ModalTrigger modal: CreateAccountModal({person-id: props.row.id}),
    a class-name: "ui button tiny", "Create Account"


cols =
  * key: 'firstName'
    display: 'First Name'

  * key:'middleName'
    display: 'Middle Name'

  * key: 'lastName'
    display: 'Last Name'

  * key: 'profiles'
    display: 'Types'
    format: (v) ->
      if v.teacherId
        "Teacher"
      else
        "Student"

  * display: 'Actions'
    resource-type: "person"
    renderer: NewTable.CrudActions
    link-to: "people"

    custom-actions: custom-actions


PeopleList = React.create-class do
  displayName: "PeopleList"
  getInitialState: ->
    people: []
  componentWillMount: ->
    api.person.find!
    .then ~>
      @set-state people: it[0]
  modal: ->
    CreatePersonModal null

  right-menu: ->
    SemanticModal.ModalTrigger modal: @modal!,
      a class-name: "ui button", "Create"

  render: ->
    div null,
      Header primary: "All People", right: @right-menu!
      div class-name: "main container",
        Grid class-name: "five column" columns: cols, data: @state.people

module.exports = PeopleList
