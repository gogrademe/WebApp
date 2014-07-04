require! {
  React

  "../../components/Panel.ls"
}

Dom = React.DOM
{ul, li} = Dom

Nav = React.create-class do
  displayName: "Nav"
  render: ->
    @transferPropsTo do
      Panel title: "Nav" className: "sidebar",
        ul className: "sidebar-nav nav",
          li null,
            "Test"

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
