require! {
  React: 'react'
  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  '../../components/SemanticModal.ls'
  '../../components/Form.ls'

  "../../api/api.ls"

  Nav: './nav.ls'
  Header: '../../components/Header.ls'

}

Dom = React.DOM
{div, a} = Dom

{Grid, StringRenderer} = NewTable

assignment-cols =
  * key: 'name'
    display: 'Name'

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

AssignmentsModal = React.create-class do
  render: ->
    @transfer-props-to do
      SemanticModal.SemanticModal title:"Create Assignment",
        div class-name: "content",
          div class-name: "ui form",
            Form.Input type: "text" label: "Name" value: "a"
            div class-name: "ui two fields",
              Form.Input type: "date" label: "Due Date" value: "b"
              Form.Input type: "text" label: "Type" value: "c"
            div class-name: "ui two fields",
              Form.Input type: "number" label: "Max Grade" value: "c"
              Form.Input type: "text" label: "Weight" value: "c"
        div class-name:"actions",
          a class-name: "ui button" on-click: @props.on-request-hide,
            "Cancel"
          a class-name: "ui button primary",
            "Save"



ClassAssignments = React.create-class do
  displayName: "ClassAssignments"
  get-initial-state: ->
    assignments: []

  component-will-mount: !->
    api.assignment.find classId: @props.params.resource-id, term-id: @props.params.term-id
      .then !~>
        @set-state do
          assignments: it[0]

  render-assignments: (xs) ->
    | !xs       => 'Loading...'
    | otherwise => assignments-template xs

  render: ->
    div null,
      Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id,
        SemanticModal.ModalTrigger modal: AssignmentsModal!,
          a class-name: "item", "Create"
      Grid columns: assignment-cols, data: @state.assignments


module.exports = ClassAssignments
