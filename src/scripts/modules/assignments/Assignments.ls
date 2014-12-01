require! {
  'react': React

  '../../components/NewTable.ls'
  '../../components/ActionRenderer'

  '../../components/SemanticModal.ls'

  "../../api/api.ls"

  'react-router': {Link}

  './AssignmentsModal.ls'
  './AssignmentGrades.ls'

}

Dom = React.DOM
{div, a, button} = Dom

{Grid, StringRenderer} = NewTable

AssignmentLink = React.create-class do
  display-name: "AssignmentLink"

  modal: ->
    AssignmentGrades assignment-id: @props.row.id

  render: ->
    div null,
      SemanticModal.ModalTrigger modal: @modal!,
        a null, @props.value

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
    api.assignment.find classId: @props.class-id, term-id: @props.term-id
      .then !~>
        @set-state do
          assignments: it

  render-assignments: (xs) ->
    | !xs       => 'Loading...'
    | otherwise => assignments-template xs

  modal: ->
    AssignmentsModal class-id: @props.class-id, term-id: @props.term-id

  render: ->
    div null,
      div class-name: "ui top attached right aligned segment",
        SemanticModal.ModalTrigger modal: @modal!,
          a class-name: "ui primary tiny button", "New Assignment"
      Grid class-name: "bottom attached" columns: assignment-cols, data: @state.assignments


module.exports = ClassAssignments
