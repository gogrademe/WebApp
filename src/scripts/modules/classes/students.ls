require! {
  React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'
  '../../components/autocomplete.ls'

  "../../api/api.ls"
}

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button, input, label, form} = Dom

{Grid, StringRenderer} = NewTable

{find-index} = require 'prelude-ls'

StudentActions = React.create-class do
  unEnroll: (e)->
    e.prevent-default!
    api.enrollment.del @props.row.id

  render: ->
    lnk = @props.column.link-to
    button class-name: "ui button tiny" on-click: @unEnroll,
      "Un-Enroll"

cols =
  * key: 'person.firstName'
    display: 'First Name'

  * key: 'person.middleName'
    display: 'Middle Name'

  * key: 'person.lastName'
    display: 'Last Name'

  * key: 'student.gradeLevel'
    display: 'Grade Level'

  * display: 'Actions'
    renderer: StudentActions
    link-to: 'class'
    class-name: 'col-md-3'


find-index-where = (rule, array) ->
  array.find-index (x) ->
    for key, value of rule
      unless x[key] is value
       return false
    return true

ClassStudents = React.create-class do
  display-name: "ClassStudents"
  get-initial-state: ->
    students: []

  delete-success: (e) !->
    @state.students.splice (find-index (.id is e.id), @state.students), 1
    @set-state do
      students: @state.students

  component-will-mount: !->
    window.events.on "enrollment.delete.success" @delete-success

    api.enrollment.find {classId: @props.params.resource-id}
      .then ~>
        @set-state do
          students: it[0]

  component-will-unmount: ->
    window.events.off "enrollment.delete.success" @delete-success

  student-selected: ->
    @set-state selected-student: it

  enroll-student: ->
    api.enrollment.create do
      student-id: @state.selected-student.profiles.studentId
      class-id: @props.params.resource-id

  render: ->
    div null,
      Panel has-body: true title: "Enroll",
        div class-name: "ui search form",
          div class-name: "ui fluid action input",
            autocomplete item-selected: @student-selected, placeholder: "Student..."
            div class-name:"ui teal button" on-click: @enroll-student,
              "Enroll"

      Panel has-body: false title: "Students" class-name: "content-area",
        Grid columns: cols, data: @state.students

module.exports = ClassStudents
