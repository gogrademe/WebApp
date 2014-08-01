require! {
  React: 'react'

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'
  '../../components/autocomplete.ls'

  "../../api/api.ls"
  Nav: './nav.ls'
  Header: '../../components/Header.ls'
}

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button, input, label, form} = Dom

{Grid, StringRenderer} = NewTable

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

ClassStudents = React.create-class do
  display-name: "ClassStudents"
  get-initial-state: ->
    students: []

  get-enrollments: ->
    api.enrollment.find {classId: @props.params.resource-id, term-id: @props.params.term-id}
      .then ~>
        @set-state do
          students: it[0]

  component-will-mount: !->
    api.enrollment.events.add-listener "change", @get-enrollments
    @get-enrollments!

  component-will-unmount: ->
    api.enrollment.events.remove-listener "change", @get-enrollments

  student-selected: ->
    @set-state selected-student: it

  enroll-student: ->
    api.enrollment.create do
      student-id: @state.selected-student.profiles.studentId
      class-id: @props.params.resource-id
      term-id: @props.params.term-id

  render: ->
    div null,
      Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      Panel has-body: true title: "Enroll",
        div class-name: "ui search form",
          div class-name: "ui fluid action input",
            autocomplete item-selected: @student-selected, placeholder: "Student..."
            div class-name:"ui teal button" on-click: @enroll-student,
              "Enroll"
      Panel has-body: false title: "Students" class-name: "content-area",
        Grid columns: cols, data: @state.students

module.exports = ClassStudents
