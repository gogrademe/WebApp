require! {
  'react': React

  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'
  '../../components/SemanticModal.ls'

  "../../api/api.ls"

  'react-router': {Link}
}

Dom = React.DOM
{div, a, button} = Dom

{Grid} = NewTable

assignment-cols =
  * key: 'name'
    display: 'Name'

  * key: 'maxScore'
    display: 'Max Grade'

  * key: 'weight'
    display: 'Weight'
    format: 'decimalPercent'


AssignmentTypes = React.create-class do
  displayName: "AssignmentTypes"
  get-initial-state: ->
    assignmentTypes: []

  component-did-mount: ->
    api.assignmentType.events.add-listener "change", @get-assignmentTypes

  component-will-unmount: ->
    api.assignmentType.events.remove-listener "change", @get-assignmentTypes

  component-will-mount: !->
    @get-assignmentTypes!

  get-assignmentTypes: ->
    api.type.find classId: @props.params.resource-id, term-id: @props.params.term-id
      .then !~>
        @set-state do
          assignmentTypes: it

  render: ->
    div null,
      div class-name: "ui top attached right aligned segment",
        SemanticModal.ModalTrigger modal: @modal!,
          a class-name: "ui primary tiny button", "New Type"
      Grid do
        class-name: "bottom attached"
        columns: assignment-cols
        data: @state.assignmentTypes


module.exports = AssignmentTypes
