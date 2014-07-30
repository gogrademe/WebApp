require! {
  React
  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"

  Nav: './nav.ls'
  Header: '../../components/Header.ls'
}

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button} = Dom

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
      Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      Grid columns: assignment-cols, data: @state.assignments


module.exports = ClassAssignments
