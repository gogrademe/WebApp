require! {
  React

  Header: '../../components/Header.ls'
  Nav: './nav.ls'

  '../../api/api.ls'
}
Dom = React.DOM
{h4, div} = Dom

View = React.create-class do
  displayName: "View"
  get-initial-state: ->
    terms: []
    class: null

  component-will-mount: !->
    api.term.find!
    .then ~>
      @set-state do
        terms: it[0]
    api.class.get @props.params.resource-id
      .then ~>
        @set-state do
          class: it
  render-title: ->
    | !@state.class => "Loading..."
    | !@props.activeRoute.props.title => "#{@state.class.name} - #{@state.class.gradeLevel}"
    | otherwise     => "#{@state.class.name} - #{@state.class.gradeLevel} / #{@props.activeRoute.props.title}"
  render: ->
    div null,
      Header title: @render-title!
      div class-name: "main",
        @props.activeRoute

module.exports =
  View:       View
  List:        require './list.ls'
  Detail:      require './detail.ls'
  Assignments: require './Assignments.ls'
  Students:    require './students.ls'
  Settings:    require './Settings.ls'
