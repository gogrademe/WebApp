require! {
  'react': React

  '../../components/src/modules/Dropdown.ls': select
  '../../components/PageHeader': Header

  'react-router': {Link, RouteHandler, State}


  '../../api/api.ls'

  'react/lib/cloneWithProps'
}
Dom = React.DOM
{div} = Dom


{find} = require 'prelude-ls'
View = React.create-class do
  mixins: [State]
  displayName: "View"
  get-initial-state: ->
    term: null
    terms: null
    class: null

  component-will-mount: !->
    api.class.get @getParams!.resource-id
      .then !~>
        @set-state do
          class: it
    api.term.find!
      .then !~>
        term-id = @getParams!.term-id
        term = find (.id is term-id), it
        @set-state terms: it[0]
        @set-state term: term

  render-primary: ->
    | !@state.class => "Loading..."
    | otherwise => "#{@state.class.name} - #{@state.class.gradeLevel}"

  render-secondary: ->
    | !@state.term => ""
    | otherwise => "Year #{@state.term.schoolYear.start}-#{@state.term.schoolYear.end} - #{@state.term.name} "

  render: ->
    div null,
      Header primary: @render-primary!, secondary: @render-secondary!
      div class-name: "main container",
        div class-name: "ui stackable grid",
          div class-name: "thirteen wide column",
            RouteHandler class-id: @getParams!.resource-id, term-id: @getParams!.term-id, class: @state.class, terms: @state.terms, term: @state.term
          div class-name: "right floated three wide column",
            div class-name: "ui fluid vertical menu sunken",
              Link class-name: "item" to: "class.overview" params:{term-id: @getParams!.term-id, resource-id: @getParams!.resource-id}, "Home"
              Link class-name: "item" to: "class.grades" params:{term-id: @getParams!.term-id, resource-id: @getParams!.resource-id}, "Grades"
              Link class-name: "item" to: "class.students" params:{term-id: @getParams!.term-id, resource-id: @getParams!.resource-id}, "Students"
              Link class-name: "item" to: "class.assignments" params:{term-id: @getParams!.term-id, resource-id: @getParams!.resource-id}, "Assignments"
              Link class-name: "item" to: "class.settings" params:{term-id: @getParams!.term-id, resource-id: @getParams!.resource-id}, "Settings"

module.exports =
  View:       View
  List:        require './list.ls'
  Grades:      require './detail.ls'
  Overview:      require './Overview'
  Assignments: require '../assignments/Assignments.ls'
  AssignmentGrades: require '../assignments/AssignmentGrades.ls'
  Students:    require './students.ls'
  Settings:    require './Settings.ls'
