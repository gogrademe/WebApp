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
  displayName: "Nav"
  get-initial-state: ->
    class: null
  component-will-mount: !->
    api.class.get @props.resource-id
      .then !~>
        @set-state do
          class: it
  title: ->
    | it => "#{it.name} - #{it.gradeLevel}"
    | otherwise => "Loading..."
  render: ->
    @transferPropsTo do
      Panel title: @title(@state.class), className: "sidebar",
        ul className: "sidebar-nav nav",
          li null, a null, "Put Term Selection Here?"
          li null, Link to: "class.detail" resourceId: @props.resourceId, "Home"
          li null, Link to: "class.students" resourceId: @props.resourceId, "Students"
          li null, Link to: "class.assignments" resourceId: @props.resourceId, "Assignments"
          li null, Link to: "class.settings" resourceId: @props.resourceId, "Settings"

module.exports = Nav


/*@transferPropsTo Panel(
  title: "Nav"
  className: "sidebar"
, ul(
  className: "sidebar-nav nav"
, Link(
  to: "detail/home"
  currentClass: @props.currentClass
  matchPattern: "/classes/assignments"
, "Home"), Link(
  to: "detail/assignments"
  currentClass: @props.currentClass
  matchPattern: "/classes/assignments"
, "Assignments"), Link(
  to: "detail/settings"
  currentClass: @props.currentClass
  matchPattern: "/classes/assignments"
, "Settings")))*/
