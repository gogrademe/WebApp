require! {
  'react': React

  '../../components/src/modules/Dropdown.ls': select
  '../../components/PageHeader.ls': Header

  'react-router': {Link}

  './nav.ls': Nav

  '../../api/api.ls'

  'react/lib/cloneWithProps'
}
Dom = React.DOM
{div} = Dom


{find} = require 'prelude-ls'
View = React.create-class do
  displayName: "View"
  get-initial-state: ->
    term: null
    terms: null
    class: null

  component-will-mount: !->
    api.class.get @props.params.resource-id
      .then ~>
        @set-state do
          class: it
    api.term.find!
      .then !~>
        term-id = @props.params.term-id
        term = find (.id is term-id), it[0]
        @set-state terms: it[0]
        @set-state term: term

  render-title: ->
    | !@state.class or !@state.terms or !@state.term => "Loading..."
    | otherwise => "#{@state.class.name} - #{@state.class.gradeLevel} / Year #{@state.term.schoolYear} - #{@state.term.name} "
  render-primary: ->
    | !@state.class => "Loading..."
    | otherwise => "#{@state.class.name} - #{@state.class.gradeLevel}"

  render-secondary: ->
    | !@state.term => ""
    | otherwise => "Year #{@state.term.schoolYear} - #{@state.term.name} "

  render: ->
    div null,
      Header primary: @render-primary!, secondary: @render-secondary!
      div class-name: "main container",
        div class-name: "ui stackable grid",
          div class-name: "thirteen wide column",
            @props.active-route-handler class: @state.class, terms: @state.terms, term: @state.term
          div class-name: "right floated three wide column",
            div class-name: "ui fluid vertical menu sunken",
              Link class-name: "item" to: "class.detail" params:{term-id: @props.params.term-id, resource-id: @props.params.resource-id}, "Grades"
              Link class-name: "item" to: "class.students" params:{term-id: @props.params.term-id, resource-id: @props.params.resource-id}, "Students"
              Link class-name: "item" to: "class.assignments" params:{term-id: @props.params.term-id, resource-id: @props.params.resource-id}, "Assignments"
              Link class-name: "item" to: "class.settings" params:{term-id: @props.params.term-id, resource-id: @props.params.resource-id}, "Settings"

module.exports =
  View:       View
  List:        require './list.ls'
  Detail:      require './detail.ls'
  Assignments: require '../assignments/Assignments.ls'
  AssignmentGrades: require '../assignments/AssignmentGrades.ls'
  Students:    require './students.ls'
  Settings:    require './Settings.ls'
