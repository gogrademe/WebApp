require! {
  'react': React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

  './nav.ls': Nav
  '../../components/Header.ls'
}
Dom = React.DOM
{div, input, i} = Dom

{Grid} = NewTable


{find, filter, ceiling, is-it-NaN, sum, map, reject, mean} = require 'prelude-ls'

GradeAverage = React.create-class do
  calc-ib-grade: (x)->
    | x > 94 => 7
    | x > 84 => 6
    | x > 74 => 5
    | x > 64 => 4
    | x > 54 => 3
    | x > 44 => 2
    | x >= 1 => 1
    | _      => 0

  calc-us-letter-grade: (x)->
    | x > 96 => "A+"
    | x > 92 => "A"
    | x > 90 => "A-"
    | x > 87 => "B+"
    | x > 84 => "B"
    | x > 79 => "B-"
    | x > 76 => "C+"
    | x > 72 => "C"
    | x > 69 => "C-"
    | x > 66 => "D+"
    | x > 62 => "D"
    | x > 59 => "D-"
    | _      => "F"


  calc-grade: ->
    grades =
      for k,v of @props.row.assignments
        v.grade?.grade

    grades
      |> reject (is undefined)
      |> map parse-int
      |> reject is-it-NaN
      |> mean
      |> (-> if is-it-NaN(it) then 0 else it)
      |> (-> +it.to-fixed 2)

  render: ->
    div {},
      "#{@calc-grade!} | #{@calc-ib-grade @calc-grade!} | #{@calc-us-letter-grade @calc-grade!}"

ClassDetail = React.create-class do
  displayName: "ClassDetail"
  get-initial-state: ->
    students: []
    grades: []
    assignments: []

  get-grades: ->
    api.grade.find!
      .then ~>
        @set-state grades: it

  get-students: ->
    api.enrollment.find {class-id: @props.params.resource-id, term-id: @props.params.term-id}
      .then ~>
        @set-state students: it

  get-assignments: ->
    api.assignment.find {class-id: @props.params.resource-id, term-id: @props.params.term-id}
      .then ~>
        @set-state assignments: it

  handle-grade-change: ({grade, assignment, student, value})->
    data =
      person-id: student
      assignment-id: assignment
      grade: value

    if !grade
      api.grade.create data
    else
      api.grade.update grade, data

  student-cols:
    [
    * key: "person.firstName"
      display: "Student"
      class-name: "two wide"
    ]
  build-cols: ->
    cols = []
    for x in @state.assignments
      cols.push do
        key: "assignments.#{x.id}.grade.grade"
        display: "#{x.name}"

    cols.push do
      display: "Avg - IB - US"
      class-name: "two wide"
      td-class-name: "positive"
      renderer: GradeAverage

    return cols

  build-data: ->
    for x in @state.students
      result =
        student:
          id: x.person.id
          name: "#{x.person.firstName} #{x.person.lastName}"
        assignments: {}

      for a in @state.assignments
        grade =
          @state.grades
            |> filter (.assignment-id is a.id)
            |> find (.person-id is x.person-id)

        result.assignments[a.id] = {
          grade: grade
          assignment: a
        }

      result

  component-will-mount: ->
    api.grade.events.add-listener "change", @get-grades

    @get-grades!
    @get-assignments!
    @get-students!

  component-will-unmount: ->
    api.grade.events.remove-listener "change", @get-grades

  render: ->
    div class-name: "ui two column fitted grid",
      #Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      div class-name: "two wide column",
        Grid columns: @student-cols, data: @state.students
      div class-name: "thirteen wide column",
        Grid columns: @build-cols!, data: @build-data!

module.exports = ClassDetail
