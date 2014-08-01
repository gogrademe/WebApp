require! {
  React: 'react'

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreatePersonModal.ls'

  '../../components/Header.ls'
}
Dom = React.DOM
{div, h3, span} = Dom

{Grid, StringRenderer} = NewTable

cols =
  * key: 'firstName'
    display: 'First Name'

  * key:'middleName'
    display: 'Middle Name'

  * key: 'lastName'
    display: 'Last Name'

  * key: 'updatedAt'
    display: 'Updated At'
    format: 'date'

  * key: 'profiles'
    display: 'Types'
    format: (v) ->
      if v.teacherId
        "Teacher"
      else
        "Student"

  * display: 'Actions'
    renderer: ActionRenderer
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

  render: ->
    div null,
      Header title: "All People"
      div class-name: "main",
        Grid columns: cols, data: @state.people

module.exports = PeopleList
