require! {
  'react': React

  '../../components/SemanticModal.ls': Modal

  "../../api/api.ls"
  "../../utils.ls"

  "../../components/autocomplete.ls"

  "../../components/AutocompleteFor.ls"

  '../../components/Header.ls': Header

  "../../components/FormMixin.ls"

}

Dom = React.DOM
{div, a, label, form} = Dom

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

  handle-save: ->
    api.assignment.create @state.assignment
      .then ~>
        @props.on-request-hide!
      .catch ~>
        console.log it

  handle-change: (key, val)->
    @state.assignment[key] = val
    @set-state assignment: @state.assignment

  render: ->
    @transfer-props-to do
      Modal.SemanticModal title:"Create Assignment",
        div class-name: "content",
          form class-name: "ui form",
            @input-for "name" label: 'Name'
            div class-name: "field",
              div class-name: "ui two fields",
                div class-name: "field",
                  label null, "Type"
                  @updatable-for AutocompleteFor.AssignmentType,"typeId", null
                @date-for "dueDate" label: "Due Date"
          @actions on-cancel: @props.on-request-hide, on-submit: @handle-save,


module.exports = AssignmentsModal
