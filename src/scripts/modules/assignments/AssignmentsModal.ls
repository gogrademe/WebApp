require! {
  'react': React

  '../../components/SemanticModal.ls': {Modal}
  '../../components/Form.ls'

  "../../api/api.ls"
  "../../utils.ls"

  "../../components/autocomplete.ls"

  "../../components/AutocompleteFor.ls"

  '../../components/Header.ls': Header

  "../../components/FormMixin.ls"

}

Dom = React.DOM
{div, a, label} = Dom

{Autocomplete, Option} = autocomplete

AssignmentsModal = React.create-class do
  mixins: [FormMixin 'assignment']
  displayName: "AssignmentsModal"
  prop-types:
    class-id: React.PropTypes.string.isRequired
    term-id: React.PropTypes.string.isRequired

  get-initial-state: ->
    assignment:
      class-id: @props.class-id
      term-id: @props.term-id
      type-id: null
      name: null
      due-date: null
      terms: []

  handle-save: ->
    it.prevent-default!

    assignment = @state.assignment

    assignment.dueDate = utils.for-upload(@state.assignment.dueDate).format!

    api.assignment.create assignment
      .then ~>
        @props.on-request-hide!
      .catch ~>
        console.log it

  on-input: ->
    null

  on-select: ->
    @state.assignment.type-id = it

    @set-state assignment: @state.assignment

  handle-change: (key, val)->
    @state.assignment[key] = val
    @set-state assignment: @state.assignment

  render-input: ({type, label, key})->
    Form.Input type: type, label: label, value: @state.assignment[key], on-change: @handle-change.bind null, key

  render: ->
    @transfer-props-to do
      Modal title:"Create Assignment",
        div class-name: "content",
          div class-name: "ui form",
            @input-for "name" label: 'Name'
            @date-for "dueDate" label: "Due Date"
            div class-name: "ui two fields",
              div class-name: "field",
                label null, "Type"
                AutocompleteFor.AssignmentType on-select: @on-select
        div class-name:"actions",
          a class-name: "ui button" on-click: @props.on-request-hide,
            "Cancel"
          a class-name: "ui button primary" on-click: @handle-save,
            "Save"


module.exports = AssignmentsModal
