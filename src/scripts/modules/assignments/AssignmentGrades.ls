require! {
  'react': React

  '../../components/NewTable.ls'

  "../../api/api.ls"

  '../../components/PageHeader': Header

  '../../components/SemanticModal.ls': Modal

}
Dom = React.DOM
{div, input, i} = Dom

{Grid} = NewTable


{find} = require 'prelude-ls'

GradeInput = React.create-class do
  get-initial-state: ->
    initial-value: @props.value
    value: @props.value
    grade-id: @props.row.grade?.id
    max-score: @props.column.max-score
    loading: false
    error: false

  on-change: ->
    @set-state value: it.target.value

  change-loading: (loading, error)->
    set-timeout do
      @set-state.bind @, loading: loading, error: error || false
      300ms

  save-change: ->
    it.prevent-default!
    if @state.initial-value !== @state.value
      data =
        person-id: @props.row.person-id
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
#    <div class="ui icon input loading">
#  <input type="text" placeholder="Search...">
#  <i class="search icon"></i>
#</div>
    render-icon = ~>
      if @state.loading
        i class-name: "spinner loading icon"
      else if @state.error
        i class-name: "red circular inverted attention sign icon"
      else
        i class-name: "icon",
          " / #{@state.max-score}"

    div class-name: "ui icon input #{'error' if @state.error}",
      input do
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
    assignment: {}

  get-grades: ->
    api.grade.find {assignment-id: @props.assignment-id}
      .then ~>
        @set-state grades: it

  get-students: ->
    api.enrollment.find {class-id: @state.assignment.class-id, term-id: @state.assignment.term-id}
      .then ~>
        @set-state students: it

  get-assignment: ->
    api.assignment.get @props.assignment-id
      .then ~>
        @set-state assignment: it
      .then ~>
        @get-grades!
        @get-students!

  build-cols: ->
    cols = [
      * key: "fullName"
        display: "Student"

      * key: "grade.comment"
        display: "Comments"

      * key: "grade.grade"
        display: "Grade"
        assignment-id: @props.assignment-id
        max-score: @state.assignment?.max-score
        renderer: GradeInput
    ]

    cols

  build-data: ->
    for x in @state.students
      result =
        personId: x.person-id
        fullName: "#{x.person.firstName} #{x.person.lastName}"
        grade: find (.person-id is x.person-id), @state.grades

      result

  component-will-mount: ->
    api.grade.events.add-listener "change", @get-grades

    @get-assignment!

  component-will-unmount: ->
    api.grade.events.remove-listener "change", @get-grades

  render: ->
    @transfer-props-to do
      Modal.SemanticModal title: "#{@state.assignment?.name} - #{@state.assignment?.type?.name}",
        Grid columns: @build-cols!, data: @build-data!

module.exports = AssignmentGrades
