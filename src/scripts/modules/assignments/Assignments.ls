require! {
  'react': React


  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  '../../components/SemanticModal.ls'
  '../../components/Form.ls'
  '../../components/Header.ls'

  "../../api/api.ls"

  '../classes/nav.ls': Nav
  'react-router': {Link}

  './AssignmentsModal.ls'

}

Dom = React.DOM
{div, a, button} = Dom

{Grid, StringRenderer} = NewTable

AssignmentLink = React.create-class do
  display-name: "AssignmentLink"
  render: ->
    div null,
      Link to: "assignments.grades", params: {assignment-id: @props.row.id},
        @props.value

assignment-cols =
  * key: 'name'
    display: 'Name'
    class-name: 'assignment.student'
    renderer: AssignmentLink

  * key: 'dueDate'
    display: 'Due Date'
    format: 'date'

  * key: 'type.name'
    display: 'Type'

  * key: 'type.maxScore'
    display: 'Max Grade'

  * key: 'type.weight'
    display: 'Weight'
    format: 'decimalPercent'
    class-name: 'col-md-1'

  * display: 'Actions'
    resource-type: "assignment"
    renderer: NewTable.CrudActions



ClassAssignments = React.create-class do
  displayName: "ClassAssignments"
  get-initial-state: ->
    assignments: []
  component-did-mount: ->
    api.assignment.events.add-listener "change", @get-assignments

  component-will-unmount: ->
    api.assignment.events.remove-listener "change", @get-assignments

  component-will-mount: !->
    @get-assignments!

  get-assignments: ->
    api.assignment.find classId: @props.params.resource-id, term-id: @props.params.term-id
      .then !~>
        @set-state do
          assignments: it[0]

  render-assignments: (xs) ->
    | !xs       => 'Loading...'
    | otherwise => assignments-template xs

  modal: ->
    AssignmentsModal class-id: @props.params.resource-id, term-id: @props.params.term-id

  render: ->
    div null,
      div class-name: "ui top attached right aligned segment",
        SemanticModal.ModalTrigger modal: @modal!,
          a class-name: "ui primary tiny button", "New Assignment"
      Grid class-name: "bottom attached" columns: assignment-cols, data: @state.assignments


module.exports = ClassAssignments
