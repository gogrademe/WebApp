{div}= require 'react'






"use strict"

RRouter = require("rrouter")
Routes = RRouter.Routes
Route = RRouter.Route
RoutingContextMixin = RRouter.RoutingContextMixin
Nav = require("./nav")
Split = React.createClass(
  displayName: "Split"
  mixins: [RoutingContextMixin]
  getDefaultProps: ->
    detail: ->

  componentWillMount: ->

  
  # if (!this.props.detailView) {
  #   this.navigate(this.props.currentClass + '/home', {replace:true});
  # }
  render: ->
    detailView = @props.detail
    div
      className: "two-col"
    , Nav(
      currentClass: @props.currentClass
      className: "sidebar-nav"
    ), detailView(test: "someTestProp")
)
ClassDetail = require("./detail")
ClassList = require("./list")
ClassAssignments = require("./Assignments")
ClassSettings = require("./Settings")
module.exports = (props) ->
  props = props or null
  Routes
    path: "/"
    view: ClassList
  , Routes(
    view: Split
    name: "detail"
    path: ":currentClass"
  , Route(
    name: "home"
    path: "home"
    detailView: ClassDetail
  ), Route(
    name: "assignments"
    path: "assignments"
    detailView: ClassAssignments
  ), Route(
    name: "settings"
    path: "settings"
    detailView: ClassSettings
  ))