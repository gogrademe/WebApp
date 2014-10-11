require! {
  'react': React

  '../../components/SemanticModal.ls': Modal
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


  render: ->
    @transfer-props-to do
      Modal.SemanticModal title: "Create Person",
        div class-name: "content",
          form class-name: "ui form" on-submit: @handle-submit,
            h4 class-name: "ui dividing header",
              "Personal Info"
            div class-name: "field",
              label null,
                "Name"
              div class-name: "three fields",
                div class-name: "field",
                  @input-for 'firstName' placeholder: 'First' type: "text"
                div class-name: "field",
                  @input-for 'middleName' placeholder: 'Middle' type: "text"
                div class-name: "field",
                  @input-for 'lastName' placeholder: 'Last' type: "text"

            h4 class-name: "ui dividing header",
              "Student Info"
            div class-name: "field",
              label null, "Grade Level"
              AutocompleteFor.GradeLevel on-select: @on-select
            @actions on-submit: @handle-submit, on-cancel: @props.on-request-hide
              #FormFor.Input label: "Grade Level" obj-id: "student.gradeLevel"


module.exports = PersonModal
