require! {
  React: 'react'

  select: '../../components/src/modules/Dropdown.ls'
  Header: '../../components/Header.ls'
  Nav: './nav.ls'

  '../../api/api.ls'

  'react/lib/cloneWithProps'
}
Dom = React.DOM
{h4, div} = Dom


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
    | otherwise => "#{@state.class.name} - #{@state.class.gradeLevel} | Year #{@state.term.schoolYear} - #{@state.term.name} "

  render: ->
    div null,
      Header title: @render-title!
      div class-name: "main",
        @props.activeRoute class: @state.class

module.exports =
  View:       View
  List:        require './list.ls'
  Detail:      require './detail.ls'
  Assignments: require './Assignments.ls'
  Students:    require './students.ls'
  Settings:    require './Settings.ls'
