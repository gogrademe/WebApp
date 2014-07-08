require! {
  React

  "../../components/Panel.ls"
  "../../api/api.ls"

  Router: "react-nested-router"
}

Dom = React.DOM
{ul, li, span, input, a} = Dom

Link = Router.Link

Nav = React.create-class do
  display-name: "Nav"
  get-initial-state: ->
    class: null
  component-will-mount: !->
    api.class.get @props.resource-id
      .then !~>
        @set-state do
          class: it
  title: ->
    | it        => "#{it.name} - #{it.gradeLevel}"
    | otherwise => "Loading..."
  render: ->
    @transferPropsTo do
      Panel title: @title(@state.class), class-name: "sidebar",
        ul class-name: "sidebar-nav nav",
          li null, a null, "Put Term Selection Here?"
          li null, Link to: "class.detail" resource-id: @props.resource-id, "Home"
          li null, Link to: "class.students" resource-id: @props.resource-id, "Students"
          li null, Link to: "class.assignments" resource-id: @props.resource-id, "Assignments"
          li null, Link to: "class.settings" resource-id: @props.resource-id, "Settings"

module.exports = Nav
