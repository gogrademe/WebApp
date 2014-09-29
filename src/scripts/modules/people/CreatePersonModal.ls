require! {
  React: 'react'

  Modal: '../../components/SemanticModal.ls'.SemanticModal
  '../../components/FormFor/FormFor.ls'

  '../../components/DatePicker'

  "../../api/api.ls"

  "../../components/autocomplete.ls"

  "../../components/AutocompleteFor.ls"

  "../../components/FormMixin.ls"

}

Dom = React.DOM
{div, a, h4, label} = Dom

PersonModal = React.create-class do
  displayName: "PersonModal"
  mixins: [FormMixin 'data']
  on-select: ->
    console.log it
  get-initial-state: ->
    data:
      user:
        username: 'blank'
  render: ->
    @transfer-props-to do
      Modal title:"Create Person",
        div class-name: "content",
          @input-for 'user.username' placeholder: 'Username'
          FormFor.Form on-cancel: @props.on-request-hide, resource: "person", method: "create",
            h4 class-name: "ui dividing header",
              "Personal Info"
            FormFor.Group label: "Name" field-count: "three",
              FormFor.Input placeholder: "First" obj-id: "firstName", required: true
              FormFor.Input placeholder: "Middle" obj-id: "middleName"
              FormFor.Input placeholder: "Last" obj-id: "lastName", required: true
            #FormFor.Input type: "date" label: "DOB" obj-id: "dateOfBirth"
            #DatePicker.DateField type: "date" label: "DOB" obj-id: "dateOfBirth"

            h4 class-name: "ui dividing header",
              "Student Info"
            div class-name: "field",
              label null, "Grade Level"
              AutocompleteFor.GradeLevel on-select: @on-select
            #FormFor.Input label: "Grade Level" obj-id: "student.gradeLevel"


module.exports = PersonModal
