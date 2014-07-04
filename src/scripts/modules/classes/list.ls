require! {
  React
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreateClassModal.ls'

  Bootstrap: "react-bootstrap"
}
Dom = React.DOM
{div, h3, span} = Dom

{Grid, StringRenderer} = NewTable
{Modal, Alert,Button, Nav, ModalTrigger} = Bootstrap

/*columns = [
  {
    name: "Id"
    width: "20%"
    key: "id"
  }
  {
    name: "Class Name"
    width: "20%"
    key: "className"
    renderer: LinkCell
  }
  {
    name: "Grade Level"
    width: "20%"
    key: "gradeLevel"
  }
  {
    name: "Teacher"
    width: "40%"
    key: "teacherName"
  }
]*/

cols = [
  {
    key: 'name'
    display: 'Class Name'
  }
  {
    key: 'gradeLevel'
    display: 'Grade Level'
  }
  {
    display: 'Actions'
    renderer: ActionRenderer
    link-to: 'class'
  }
]
ClassList = React.create-class do
  displayName: "ClassList"
  getInitialState: ->
    classes: []
  componentWillMount: ->
    api.class.find!
    .then ~>
      @set-state classes: it[0]
  render: ->
    div className: "content-area panel panel-default",
      div className: "panel-heading clearfix",
        div className: "row",
          div className: "col-sm-4",
            h3 className: "panel-title",
              "All Classes"
          div className: "col-sm-8 text-align-right",
            div className: "btn-group pull-right"
              #ModalTrigger modal: CreateClassModal flux: @getFlux!,
              #    Button bsStyle: "primary" bsSite: "small",
              #      "Add"
      Grid columns: cols, data: @state.classes

module.exports = ClassList
