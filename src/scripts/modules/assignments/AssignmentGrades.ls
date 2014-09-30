require! {
  React: 'react'

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

  Nav: './nav.ls'
  '../../components/Header.ls'
  '../../components/Form.ls'
}
Dom = React.DOM
{div, input, i} = Dom

{Grid} = NewTable

GradeInput = React.create-class do
  get-initial-state: ->
    initial-value: @props.value
    value: @props.value
    grade-id: @props.row.assignments[@props.column.assignment-id].grade?.id
    max-score: @props.row.assignments[@props.column.assignment-id].assignment.type.max-score
    loading: false
    error: false

  on-change: ->
    @set-state value: it

  change-loading: (loading, error)->
    set-timeout do
      @set-state.bind @, loading: loading, error: error || false
      300ms

  save-change: ->
    it.prevent-default!
    if @state.initial-value !== @state.value
      data =
        student-id: @props.row.student.id
        assignment-id: @props.column.assignment-id
        grade: @state.value

      @set-state loading: true

      if !@state.grade-id
        api.grade.create data
          .then ~>
            @change-loading false
          .catch ~>
            @refs.grade-input.get-inputDOM-Node!.focus!
            @change-loading false, true
      else
        api.grade.update @state.grade-id, data
          .then ~>
            @change-loading false
          .catch ~>
            @refs.grade-input.getDOMNode!.focus!
            @change-loading false, true

  render: ->
    render-icon = ~>
      if @state.loading
        i class-name: "spinner loading icon"
      else if @state.error
        i class-name: "red circular inverted attention sign icon"
      else
        i class-name: "icon",
          " / #{@state.max-score}"

    div class-name: "ui icon input #{'error' if @state.error}",
      Form.Input do
        ref: "gradeInput"
        type: "text"
        class-name: "grade"
        placeholder: "Score"
        on-blur: @save-change
        value: @state.value
        on-change: @on-change

      render-icon!

AssignmentGrades = React.create-class do
  displayName: "AssignmentGrades"
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
        display: "#{x.name}"
        renderer: GradeInput
        change-handler: @handle-grade-change

    cols.push do
      display: "Avg - IB - US"
      class-name: "two wide"
      td-class-name: "positive"
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
    div {},
      #Nav resource-id: @props.params.resource-id, term-id: @props.params.term-id
      Grid columns: @build-cols!, data: @build-data!

module.exports = AssignmentGrades
