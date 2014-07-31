require! {
  React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

  Nav: './nav.ls'
  Header: '../../components/Header.ls'
  '../../components/Form.ls'
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

GradeInput = React.create-class do
  get-initial-state: ->
    initial-value: @props.value
    value: @props.value
    grade-id: @props.row.assignments[@props.column.assignment-id].grade?.id
    max-score: @props.row.assignments[@props.column.assignment-id].assignment.type.max-score

  on-change: ->
    @set-state value: it

  /*valid: ->
    if @state.value > @state.max-score
      @console.log @state.value > @state.max-score
      false
    if is-it-NaN @state.value
      false

    true*/

  save-change: ->
    it.prevent-default!
    if @state.initial-value !== @state.value
      @props.column.change-handler do
        grade: @state.grade-id
        assignment: @props.column.assignment-id
        student: @props.row.student.id
        value: @state.value

  render: ->
    div class-name: "ui icon small input",
      Form.Input do
        type: "text"
        placeholder: "Score"
        on-blur: @save-change
        value: @state.value
        on-change: @on-change

      i class-name: "icon",
        " / #{@state.max-score} "

ClassDetail = React.create-class do
  displayName: "ClassDetail"
  get-initial-state: ->
    students: []
    grades: []
    assignments: []

  get-grades: ->
    api.grade.find!
      .then ~>
        @set-state grades: it[0]

  get-students: ->
    api.enrollment.find {class-id: @props.params.resource-id, term-id: @props.params.term-id}
      .then ~>
        @set-state students: it[0]

  get-assignments: ->
    api.assignment.find {class-id: @props.params.resource-id, term-id: @props.params.term-id}
      .then ~>
        @set-state assignments: it[0]

  handle-grade-change: ({grade, assignment, student, value})->
    data =
      student-id: student
      assignment-id: assignment
      grade: value

    if !grade
      api.grade.create data
    else
      api.grade.update grade, data

  build-cols: ->
    cols = [
      * key: "student.name"
        display: "Student"
        class-name: "two wide"
    ]
    for x in @state.assignments
      cols.push do
        assignment-id: x.id
        key: "assignments.#{x.id}.grade.grade"
        display: x.name
        renderer: GradeInput
        change-handler: @handle-grade-change

    cols.push do
      display: "Avg - IB - US"
      class-name: "two wide"
      renderer: GradeAverage

    cols

  build-data: ->
    for x in @state.students
      result =
        student:
          id: x.student.id
          name: "#{x.person.firstName} #{x.person.lastName}"
        assignments: {}

      for a in @state.assignments
        grade =
          @state.grades
            |> filter (.assignment-id is a.id)
            |> find (.student-id is x.student-id)

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
    div null,
      Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      Grid columns: @build-cols!, data: @build-data!

module.exports = ClassDetail
