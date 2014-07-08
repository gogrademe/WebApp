require! {
  React

  Nav: './nav.ls'

  '../../api/api.ls'
}
Dom = React.DOM
{div} = Dom

Split = React.create-class do
  displayName: "Split"
  render: ->
    div class-name: "two-col",
      Nav class-name: "sidebar-nav" resource-id: @props.params.resource-id
      @props.activeRoute

module.exports =
  Split:       Split
  List:        require './list.ls'
  Detail:      require './detail.ls'
  Assignments: require './Assignments.ls'
  Students:    require './students.ls'
  Settings:    require './Settings.ls'
