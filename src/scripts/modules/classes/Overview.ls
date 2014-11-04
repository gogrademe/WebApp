require! {
  'react': React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'

  "../../api/api.ls"

}
Dom = React.DOM
{div, input, i} = Dom

{Grid} = NewTable


{find, filter, ceiling, is-it-NaN, sum, map, reject, mean, group-by, unique-by, flatten} = require 'prelude-ls'

GradeOverview = React.create-class do
  displayName: "GradeOverview"
  get-initial-state: ->
    students: []
    grades: []
    assignments: []

  get-grades: ->
    api.grade.find {class-id: @props.params.resource-id, term-id: @props.params.term-id}
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

  group-types: ->
    @state.assignments
      |> map (.type)
      |> unique-by (.id)


  a-by-type: ->
    @state.assignments
      |> group-by (.type-id)
      #|> map (-> it.type-name = it.type.name)

  set-for-each: (key, value, xs)-->
    for x in xs
      x[key] = value
    xs

  build-cols: ->
    cols = [
      * key: "student.name"
        display: "Student"
        class-name: "two wide"
    ]
    for x in @group-types!
      cols.push do
        key: "types.#{x.id}"
        display: x.name

    return cols

  what-it-should-look-like:
    * student:
        id: "Something"
        name: "Jake Price"
      types:
        type-id1:
          total: "100%"
        type-id2:
          total: "100%"

  build-data: ->
    for x in @state.students
      result =
        student:
          id: x.person.id
          name: "#{x.person.firstName} #{x.person.lastName}"
        types: @a-by-type!

      result

  component-will-mount: ->
    api.grade.events.add-listener "change", @get-grades

    @get-grades!
    @get-assignments!
    @get-students!

  component-will-unmount: ->
    api.grade.events.remove-listener "change", @get-grades

  render: ->
    #console.log @build-data2!
    #console.log @build-test!
    console.log @build-cols!
    console.log @build-data!
    div null,
      Grid columns: @build-cols!, data: @build-data!

module.exports = GradeOverview
