require! {
  'react': React

  "../../components/Panel.ls"
  '../../components/NewTable.ls'
  '../../components/ActionRenderer'
  '../../components/autocomplete.ls'

  "../../api/api.ls"
}

Dom = React.DOM
{div, button} = Dom

{Grid, StringRenderer} = NewTable

{Autocomplete, Option} = autocomplete

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

  * key: 'person.gradeLevel'
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
    api.enrollment.find {classId: @props.class.id, term-id: @props.term.id}
      .then ~>
        @set-state do
          students: it

  component-did-mount: !->
    api.enrollment.events.add-listener "change", @get-enrollments
    @get-enrollments!

    api.person.find!
      .then ~>
        @set-state people: it

  component-will-unmount: ->
    api.enrollment.events.remove-listener "change", @get-enrollments

  student-selected: ->
    @set-state selected-student: it.target.value

  enroll-student: ->
    api.enrollment.create do
      person-id: @state.selected-student
      class-id: @props.class.id
      term-id: @props.term.id

  render: ->
    div null,
      div class-name: "ui top attached segment",
        div class-name: "ui search form",
          div class-name: "ui fluid action input",
            Autocomplete on-change: @student-selected, placeholder: "Student...",
              if @state.people
                @state.people.map (p, key)->
                  Option key: key, value: p.id, label: "#{p.first-name} #{p.last-name}"
              else
                "Loading..."
            div class-name:"ui primary button" on-click: @enroll-student,
              "Enroll"
      Grid class-name: "bottom attached" columns: cols, data: @state.students

module.exports = ClassStudents
