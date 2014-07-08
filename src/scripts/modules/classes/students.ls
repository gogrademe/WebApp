require! {
  React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer.ls'

  "../../api/api.ls"
}

Dom = React.DOM
{div, h1, img, span, ul,li, a, i, button, input, label} = Dom

{Grid, StringRenderer} = NewTable

{find-index} = require 'prelude-ls'

StudentActions = React.create-class do
  unEnroll: (e)->
    e.prevent-default!
    api.enrollment.del @props.row.id

  render: ->
    lnk = @props.column.link-to
    div class-name: "btn-group btn-group-sm",
      button class-name: "btn btn-default" on-click: @unEnroll,
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
  displayName: "ClassStudents"
  get-initial-state: ->
    students: []

  deleteSuccess: (e) !->
    @state.students.splice (find-index (.id is e.id), @state.students), 1
    @set-state do
      students: @state.students

  component-will-mount: !->
    window.events.on "enrollment.delete.success" @deleteSuccess

    api.enrollment.find {classId: @props.params.resource-id}
      .then ~>
        @set-state do
          students: it[0]

  component-will-unmount: ->
    window.events.off "enrollment.delete.success" @deleteSuccess

  render: ->
    div null,
      Panel hasBody: true title: "Enroll" class-name: "content-area",
        div class-name: "form-group",
          input type:"text" placeholder: "Student" class-name:"form-control"

      Panel hasBody: false title: "Students" className: "content-area",
        Grid columns: cols, data: @state.students

module.exports = ClassStudents
