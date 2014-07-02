{ul}= require 'react'
 


RRouter = require("rrouter")
Link = require("../../components/HighlightedLink.jsx")
Panel = require("../../components/Panel.jsx")
Nav = React.createClass(
  displayName: "Nav"
  render: ->
    @transferPropsTo Panel(
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
    , "Settings")))
)
module.exports = Nav