require! {
  React: 'react'

  Modal: '../../components/SemanticModal.ls'.SemanticModal
  '../../components/FormFor/FormFor.ls'

  "../../api/api.ls"

  "../../components/autocomplete.ls"

  "../../components/AutocompleteFor.ls"

}

Dom = React.DOM
{div, a, h4} = Dom

PersonModal = React.create-class do
  displayName: "PersonModal"

  render: ->
    @transfer-props-to do
      Modal title:"Create Person",
        div class-name: "content",
          FormFor.Form on-cancel: @props.on-request-hide, resource: "person", method: "create",
            h4 class-name: "ui dividing header",
              "Personal Info"
            FormFor.Group label: "Name" field-count: "three",
              FormFor.Input placeholder: "First" obj-id: "firstName", required: true
              FormFor.Input placeholder: "Middle" obj-id: "middleName"
              FormFor.Input placeholder: "Last" obj-id: "lastName", required: true
            FormFor.Input type: "date" label: "DOB" obj-id: "dateOfBirth"
            h4 class-name: "ui dividing header",
              "Student Info"
            FormFor.Input label: "Grade Level" obj-id: "student.gradeLevel"


module.exports = PersonModal
