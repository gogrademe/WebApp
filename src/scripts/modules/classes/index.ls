{div}= require 'react'

RRouter = require("rrouter")
Routes = RRouter.Routes
Route = RRouter.Route
RoutingContextMixin = RRouter.RoutingContextMixin
Nav = require("./nav.ls")
Split = React.createClass(
  displayName: "Split"
  mixins: [RoutingContextMixin]

  render: ->
    detailView = @props.detail
    div className: "two-col"
    Nav currentClass: @props.currentClass className: "sidebar-nav",
      detailView test: "someTestProp"
)
ClassDetail = require("./detail.ls")
ClassList = require("./list.ls")
ClassAssignments = require("./Assignments.ls")
ClassSettings = require("./Settings.ls")
module.exports = (props) ->
  props = props or null
  Routes path: "/" view: ClassList,
    Routes view: Split name: "detail" path: ":currentClass",
      Route name: "home" path: "home" detailView: ClassDetail
      Route name: "assignments" path: "assignments" detailView: ClassAssignments
      Route name: "settings" path: "settings" detailView: ClassSettings
