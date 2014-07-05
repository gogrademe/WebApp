require! {
  React
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreatePersonModal.ls'

  Bootstrap: "react-bootstrap"
}
Dom = React.DOM
{div, h3, span} = Dom

{Grid, StringRenderer} = NewTable
{Modal, Alert,Button, Nav, ModalTrigger} = Bootstrap


cols = [
  {
    key: 'firstName'
    display: 'First Name'
  }
  {
    key:'middleName'
    display: 'Middle Name'
  }
  {
    key: 'lastName'
    display: 'Last Name'
  }
  {
    key: 'updatedAt'
    display: 'Updated At'
    format: (d) ->
      moment(d).format('L')
  }
  {
    key: 'profiles'
    display: 'Types'
    format: (v) ->
      if v.teacherId
        "Teacher"
      else
        "Student"
  }
  {
    display: 'Actions'
    renderer: ActionRenderer
    link-to: "people"
  }
]

PeopleList = React.create-class do
  displayName: "PeopleList"
  getInitialState: ->
    people: []
  componentWillMount: ->
    api.person.find!
    .then ~>
      @set-state people: it[0]

  render: ->
    div class-name: "content-area panel panel-default",
      div class-name: "panel-heading clearfix",
        div class-name: "row",
          div class-name: "col-sm-4",
            h3 class-name: "panel-title",
              "All People"
          div className: "col-sm-8 text-align-right",
            div className: "btn-group pull-right",
              ModalTrigger modal: CreatePersonModal(flux: flux),
                Button bsStyle: "primary" bsSite: "small",
                  "Add"
      Grid columns: cols, data: @state.people

module.exports = PeopleList
