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

cols =
  * key: 'name'
    display: 'Class Name'

  * key: 'gradeLevel'
    display: 'Grade Level'

  * display: 'Actions'
    renderer: ActionRenderer
    link-to: 'class'
    class-name: 'col-md-3'

ClassList = React.create-class do
  displayName: "ClassList"
  getInitialState: ->
    classes: []

  componentWillMount: ->
    api.class.find!
    .then ~>
      @set-state classes: it[0]

  render: ->
    div class-name: "ui grid",
      div class-name:"row",
        Panel class-name:"column" hasBody: false title: "All Classes",
          Grid class-name: "ui attached" columns: cols, data: @state.classes

/*div className: "col-sm-8 text-align-right",
  div className: "btn-group pull-right"
    #ModalTrigger modal: CreateClassModal flux: @getFlux!,
    #    Button bsStyle: "primary" bsSite: "small",
    #      "Add"*/

module.exports = ClassList
