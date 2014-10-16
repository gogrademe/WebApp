require! {
  'react': React

  '../../components/SemanticModal.ls': Modal

  '../../components/DatePicker'

  "../../api/api.ls"

  "../../components/autocomplete.ls"

  "../../components/AutocompleteFor.ls"

  "../../components/FormMixin.ls"
}

Dom = React.DOM
{div, a, h4, label, form} = Dom

PersonModal = React.create-class do
  displayName: "PersonModal"
  mixins: [FormMixin 'data']

  on-select: ->
    @state.data.gradeLevel = it
    @set-state data: @state.data

  handle-submit: ->
    api.person.create @state.data
      .then ~>
        @props.on-request-hide!

  handle-cancel: ->

  get-initial-state: ->
    data:
      firstName: ''
      middleName: ''
      lastName: ''
      gradeLevel: ''
      types: []

  render: ->
    @transfer-props-to do
      Modal.SemanticModal title: "Create Person",
        div class-name: "content",
          form class-name: "ui form",
            h4 class-name: "ui dividing header",
              "Personal Info"
            div class-name: "field",
              label null,
                "Name"
              div class-name: "three fields",
                @input-for 'firstName' placeholder: 'First'
                @input-for 'middleName' placeholder: 'Middle'
                @input-for 'lastName' placeholder: 'Last'
            @input-for 'email' label: 'Email' type: 'email'
            div class-name: "field",
              label null, "Type"
              @updatable-for AutocompleteFor.ProfileTypes, "types", null

            h4 class-name: "ui dividing header",
              "Student Info"
            div class-name: "field",
              label null, "Grade Level"
              @updatable-for AutocompleteFor.GradeLevel, "gradeLevel", null
            @actions on-submit: @handle-submit, on-cancel: @props.on-request-hide
              #FormFor.Input label: "Grade Level" obj-id: "student.gradeLevel"


module.exports = PersonModal
