require! {
  React: 'react'

  Modal: '../../components/SemanticModal.ls'.SemanticModal
  '../../components/FormFor/FormFor.ls'

  '../../components/DatePicker'

  "../../api/api.ls"

  "../../components/autocomplete.ls"

  "../../components/AutocompleteFor.ls"

  "../../components/FormMixin.ls"
  "../../components/Form.ls"
}

Dom = React.DOM
{div, a, h4, label, form} = Dom

PersonModal = React.create-class do
  displayName: "PersonModal"
  mixins: [FormMixin 'data']

  on-select: ->
    console.log it

  handle-submit: ->
    
  handle-cancel: ->

  get-initial-state: ->
    data:
      person:
        firstName: ''
        middleName: ''
        lastName: ''


  render: ->
    @transfer-props-to do
      Modal title: "Create Person",
        Form.Form on-submit: @handle-submit, on-cancel: @handle-cancel, is-modal: true,
          h4 class-name: "ui dividing header",
            "Personal Info"
          div class-name: "field",
            label null,
              "Name"
            div class-name: "three fields",
              div class-name: "field",
                @input-for 'person.firstName' placeholder: 'First' type: "text"
              div class-name: "field",
                @input-for 'person.middleName' placeholder: 'Middle' type: "text"
              div class-name: "field",
                @input-for 'person.lastName' placeholder: 'Last' type: "text"

          h4 class-name: "ui dividing header",
            "Student Info"
          div class-name: "field",
            label null, "Grade Level"
            AutocompleteFor.GradeLevel on-select: @on-select
            #FormFor.Input label: "Grade Level" obj-id: "student.gradeLevel"


module.exports = PersonModal
