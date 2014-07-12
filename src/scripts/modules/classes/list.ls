require! {
  React
  moment

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  './CreateClassModal.ls'

  Header: '../../components/Header.ls'
}
Dom = React.DOM
{div, h3, span, h4, button} = Dom

{Grid, StringRenderer} = NewTable

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
    div null,
      Header title: 'All Classes'
      div class-name: "main",
        Grid columns: cols, data: @state.classes

module.exports = ClassList
