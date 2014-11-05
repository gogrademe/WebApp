require! {
  'react': React
  "react-router": {Link}
  "../../components/ModalMixin.ls": ModalMixin

  "../../components/FormMixin.ls"
  "../../components/AutocompleteFor.ls"
  '../../components/SemanticModal.ls': Modal

  "../../api/api.ls"

}

Dom = React.DOM
{div, button, form, label} = Dom

CreateClassModal = React.create-class do
  mixins: [FormMixin 'class']
  displayName: "CreateClassModal"

  handle-submit: !->
    api.class.create @state.class
      .then ~>
        @props.on-request-hide!
      .error ~>
        @set-state errors: it.body

  get-initial-state: ->
    class: {}
    errors: null

  render: ->
    @transferPropsTo do
      Modal.SemanticModal title: "Create Class" animation: true,
        div class-name: "content",
          form class-name: "ui form" on-submit: @handle-submit,
            @messages messages: @state.errors
            @input-for 'name' label: 'Name'
            div class-name: "ui two fields",
              @input-for 'maxStudents' label: 'Max Students'
              div class-name: "field",
                label null, "Grade Level"
                @updatable-for AutocompleteFor.GradeLevel, 'gradeLevel', null
            div class-name: "field",
              label null, "Term"
              @updatable-for AutocompleteFor.SchoolTerms, 'term', null

            @actions on-submit: @handle-submit, on-cancel: @props.on-request-hide

module.exports = CreateClassModal
