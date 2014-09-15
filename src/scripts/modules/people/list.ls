require! {
  React: 'react'

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreatePersonModal.ls'

  '../../components/Header.ls'

  '../../components/SemanticModal.ls'
}
Dom = React.DOM
{div, h3, span, a} = Dom

{Grid, StringRenderer} = NewTable

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
    class-name: 'col-md-3'

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

  render: ->
    div null,
      Header title: "All People"
      div class-name: "main",
        div class-name: "ui toolbar menu inverted black block header",
          div null
          div class-name:"right menu",
            SemanticModal.ModalTrigger modal: @modal!,
              a class-name: "item", "Create"
        Grid columns: cols, data: @state.people

module.exports = PeopleList
